const _ = require('lodash');
const queries = require('./query');
const aggs = require('./aggregation');
const Search = require('./search');
const errors = require('../../exceptions/errors');
const SortOrder = require('./enums/sort_order');
const SortMode = require('./enums/sort_mode');

class Mapper {
    static check_wellform_object(obj) {
        const keys = Object.keys(obj);
        const contains_dollars = keys.some(key => key.startsWith('$$'));
        const contains_dollar = keys.some(key => key.startsWith('$') && !key.startsWith('$$'));
        const contains_shortcut = keys.every(key => !key.startsWith('$'));
        return [contains_dollar, contains_dollars, contains_shortcut];
    }

    static auto_nest(types) {
        return types.reduce((acc, elt) => {
            const [key, parent, type] = elt;
            switch (type) {
            case 'nested': {
                if (acc.length === 0) {
                    const nq = new queries.Nested();
                    acc = [nq, nq];
                } else if (acc[0] instanceof queries.Nested) {
                    const nq = new queries.Nested();
                    acc[1].query(nq);
                    acc[0] = nq;
                }

                if (parent === '') {
                    acc[0].path(key);
                } else {
                    acc[0].path(`${parent}.${key}`);
                }
                return acc;
            }
            default:
                return acc;
            }
        }, []);
    }

    static raw_query(obj) {
        const keys = Object.keys(obj);
        if (keys[0].startsWith('$$')) {
            return new queries.RawQuery({ [keys[0].replace('$$', '')]: obj[keys[0]] });
        }
        return null;
    }

    static shortcut_query(obj, mapping) {
        const keys = Object.keys(obj);
        if (keys.length === 0) {
            return null;
        }

        const key = keys[0];
        const types = mapping.get_all_type(key);
        if (types.length === 0) {
            return null;
        }

        const infos = types[types.length - 1];
        const type = infos[infos.length - 1];
        const value = obj[key];
        let outer_query = null;
        let most_inner_query = null;
        if (types.length > 1) {
            [most_inner_query, outer_query] = Mapper.auto_nest(types);
        }

        if (value instanceof Array) {
            switch (type) {
            case 'text': {
                const matches = value.map((elt) => {
                    if (elt instanceof Object) {
                        return Mapper.special_shortcut_query(key, type, elt);
                    }
                    return new queries.Match().match({ [key]: elt });
                }).filter(elt => elt != null);
                const bool = matches.reduce((q, elt) => q.should(elt), new queries.Bool());

                if (outer_query != null) {
                    most_inner_query.query(bool);
                    return outer_query;
                }
                return bool;
            }
            default: {
                const terms = new queries.Terms({ [key]: value });
                if (outer_query != null) {
                    most_inner_query.query(terms);
                    return outer_query;
                }
                return terms;
            }
            }
        } else if (value instanceof Object) {
            const q = Mapper.special_shortcut_query(key, type, value);
            if (q != null && outer_query != null) {
                most_inner_query.query(q);
                return outer_query;
            }
            return q;
        } else {
            switch (type) {
            case 'text': {
                const q = new queries.Match().match({ [key]: value });
                if (outer_query != null) {
                    most_inner_query.query(q);
                    return outer_query;
                }
                return q;
            }
            default: {
                const q = new queries.Term({ [key]: value });
                if (outer_query != null) {
                    most_inner_query.query(q);
                    return outer_query;
                }
                return q;
            }
            }
        }
    }

    static special_shortcut_query(key, type, object) {
        if ('$qs' in object) {
            return new queries.QueryString().qs(object.$qs).default_field(key);
        }

        if ('$match' in object && 'query' in object.$match) {
            return new queries.Match(object.$match).match({ [key]: object.$match.query });
        }
        return null;
    }

    static visit_object(obj, mapping) {
        const result = Mapper.check_wellform_object(obj);

        if (result.filter(r => r === true) >= 2) {
            throw errors.InvalidObject();
        }

        const [contains_dollar, contains_dollars, contains_shortcut] = result;
        if (contains_dollar) {
            return Mapper.bool_query(obj, mapping);
        } else if (contains_dollars) {
            return Mapper.raw_query(obj);
        } else if (contains_shortcut) {
            return Mapper.shortcut_query(obj, mapping);
        }
        return null;
    }

    static visit_bool_query(bool, obj, op, mapping) {
        const result = Mapper.visit_object(obj, mapping);

        switch (op) {
        default:
        case '$and':
            if (result) {
                bool.must(result);
            }
            break;
        case '$fand':
            if (result) {
                bool.filter(result);
            }
            break;
        case '$nfand':
            if (result) {
                bool.must_not(result);
            }
            break;
        case '$or':
            if (result) {
                bool.should(result);
            }
            break;
        }
        return bool;
    }

    static visit_list(bool, list, op, mapping) {
        list.forEach((obj) => {
            bool = Mapper.visit_bool_query(bool, obj, op, mapping);
        });
        return bool;
    }


    static bool_query(obj, mapping) {
        let bool = new queries.Bool();
        ['$and', '$fand', '$nfand', '$or'].forEach((op) => {
            if (!(op in obj)) {
                return;
            }

            const val = obj[op];
            if (val instanceof Array) {
                bool = Mapper.visit_list(bool, val, op, mapping);
            } else {
                bool = Mapper.visit_bool_query(bool, val, op, mapping);
            }
        });
        return bool;
    }
}

class SortMapper {
    static visit_object(sort, mapping) {
        const sorts = sort.map(s => SortMapper.make_single_sort(s, mapping))
            .filter(s => s != null);
        return sorts;
    }

    static make_single_sort(sort, mapping) {
        if (typeof sort === 'string') {
            sort = { [sort]: [] };
        }

        const final_sort_obj = {};
        const keys = Object.keys(sort);
        if (keys.length === 0) {
            return null;
        }

        const key = keys[0];
        const types = mapping.get_all_type(key);

        const nested_fields = types.filter(elt => elt[elt.length - 1] === 'nested');
        if (nested_fields.length > 1) {
            return null;
        }

        final_sort_obj[key] = {};

        if (nested_fields.length === 1) {
            final_sort_obj[key].nested_path = nested_fields[0][0];
        }

        const value = sort[key];
        if (value instanceof Array) {
            const tmp = SortMapper.retrieve_mode_and_order(value);
            final_sort_obj[key] = _.merge(final_sort_obj[key], tmp);
        } else {
            const tmp = SortMapper.retrieve_mode_and_order([value]);
            final_sort_obj[key] = _.merge(final_sort_obj[key], tmp);
        }

        return final_sort_obj;
    }

    static retrieve_mode_and_order(array) {
        const final_obj = array.reduce((acc, elt) => {
            const oen = SortOrder.enumValueOf(elt.toUpperCase());
            if (oen !== undefined) {
                acc.order = oen.toString();
            }
            const men = SortMode.enumValueOf(elt.toUpperCase());
            if (men !== undefined) {
                acc.mode = men.toString();
            }
            return acc;
        }, {});
        return final_obj;
    }
}

class AggregationMapper {
    static auto_nest(types) {
        return types.reduce((acc, elt) => {
            const [key, parent, type] = elt;
            switch (type) {
            case 'nested': {
                if (acc.length === 0) {
                    const nq = new aggs.NestedAggregation(`${key}_nested`);
                    acc = [nq, nq];
                } else if (acc[0] instanceof aggs.NestedAggregation) {
                    const nq = new aggs.NestedAggregation(`${key}_nested`);
                    acc[1].aggregation(nq);
                    acc[0] = nq;
                }

                if (parent === '') {
                    acc[0].path(key);
                } else {
                    acc[0].path(`${parent}.${key}`);
                }
                return acc;
            }
            default:
                return acc;
            }
        }, []);
    }


    static visit_object(aggregations, mapping) {
        const a = _.reduce(aggregations, (obj, value, key) => {
            const agg = AggregationMapper.visit_single_aggregation(key, value, mapping);
            if (agg != null) {
                obj = _.merge(obj, agg.generate());
            }
            return obj;
        }, {});
        return a;
    }

    static visit_single_aggregation(field, aggregation, mapping) {
        if (!('$type' in aggregation)) {
            return null;
        }

        const type = aggregation.$type;
        const name = aggregation.$name || `${field}_${type}`;

        delete aggregation.$type;
        if ('$name' in aggregation) {
            delete aggregation.$name;
        }

        let most_outer_agg = null;
        if ('$filter' in aggregation) {
            most_outer_agg = new aggs.FilterAggregation(`${field}_filter`).query(aggregation.$filter);
        }

        const types = mapping.get_all_type(field);
        if (types.length === 0) {
            return null;
        }


        let most_inner_agg = null;
        let outer_agg = null;
        if (types.length > 1) {
            [most_inner_agg, outer_agg] = AggregationMapper.auto_nest(types);
        }

        let agg = AggregationMapper.forge_aggregation(name, field, type,
                aggregation, mapping);
        if (most_inner_agg != null && agg != null) {
            most_inner_agg.aggregation(agg);
        }

        if ('$aggregations' in aggregation) {
            const subaggregations = aggregation.$aggregations;
            if (agg instanceof aggs.BucketAggregation) {
                agg = _.reduce(subaggregations,
                        AggregationMapper.visit_subaggregation.bind(null, mapping), agg);
            }
        }

        if (most_outer_agg != null) {
            if (outer_agg != null) {
                most_outer_agg.aggregation(outer_agg);
            } else {
                most_outer_agg.aggregation(agg);
            }
            return most_outer_agg;
        } else if (most_inner_agg != null) {
            return outer_agg;
        }
        return agg;
    }

    static visit_subaggregation(mapping, obj, subvalue, subfield) {
        const subagg = AggregationMapper
                    .visit_single_aggregation(subfield, subvalue, mapping);
        if (subagg != null) {
            obj.aggregation(subagg);
        }
        return obj;
    }


    static forge_aggregation(name, field, type, aggregation, mapping) {
        switch (type) {
        case 'min':
            return new aggs.MinAggregation(name, aggregation).field(field);
        case 'avg':
            return new aggs.AvgAggregation(name, aggregation).field(field);
        case 'max':
            return new aggs.MaxAggregation(name, aggregation).field(field);
        case 'sum':
            return new aggs.SumAggregation(name, aggregation).field(field);
        case 'value_count':
            return new aggs.ValueCountAggregation(name, aggregation).field(field);
        case 'cardinality':
            return new aggs.CardinalityAggregation(name, aggregation).field(field);
        case 'terms':
            return new aggs.TermsAggregation(name, aggregation).field(field);
        case 'filter': {
            if (!('$query' in aggregation)) {
                return null;
            }

            /* let result = Mapper.visit_object(aggregation.$query, mapping);
            if (result == null) {
                result = new queries.MatchAll();
            }*/
            return new aggs.FilterAggregation(name, aggregation).query(aggregation.$query);
        }
        default:
            return null;
        }
    }
}

function transform_to_search(body, mapping) {
    const s = new Search();
    if (!('where' in body)) {
        s.query(new queries.MatchAll());
        return s;
    }

    const where = body.where;
    const result = Mapper.visit_object(where, mapping);
    if (result) {
        s.query(result);
    } else {
        s.query(new queries.MatchAll());
    }
    return s;
}

function transform_to_sort(body, mapping) {
    if (!('sort' in body)) {
        return null;
    }

    const sort = body.sort;
    const result = SortMapper.visit_object(sort, mapping);
    return result;
}

function transform_to_aggregation(body, mapping) {
    if (!('aggregations' in body)) {
        return null;
    }

    const agg = body.aggregations;
    const result = AggregationMapper.visit_object(agg, mapping);
    return result;
}


module.exports = {
    transform_to_search,
    transform_to_sort,
    transform_to_aggregation,
};
