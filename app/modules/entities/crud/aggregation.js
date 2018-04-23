// @flow
const _ = require('lodash');

class Aggregation {
    _name: string;
    _object: Object;
    _field: ?string;

    constructor(name: string, object: Object = {}) {
        this._name = name;
        this._object = object;
        this._field = 'field' in object ? object.field : null;
    }

    get name(): string {
        return this._name;
    }

    field(f: string) {
        this._field = f;
        return this;
    }

    generate(): Object {
        return this._object;
    }
}

class MetricAggregation extends Aggregation {
}

class SingleValueMetricAggregation extends MetricAggregation {
    _missing: any;
    constructor(name: string, object: Object = {}) {
        super(name, object);
        this._missing = 'missing' in object ? object.missing : null;
    }

    missing(v: any) {
        if (v == null) {
            return this;
        }
        this._missing = v;
        return this;
    }


    generate() {
        const obj = {
            [this._name]: {},
        };

        const subobj = {
            field: this._field,
        };

        if (this._missing != null) {
            subobj.missing = this._missing;
        }

        const cname = this.constructor.name.toLowerCase().replace('aggregation', '');
        if (cname === 'valuecount') {
            obj[this._name].value_count = subobj;
        } else {
            obj[this._name][cname] = subobj;
        }
        return obj;
    }
}

class AvgAggregation extends SingleValueMetricAggregation {}
class MinAggregation extends SingleValueMetricAggregation {}
class MaxAggregation extends SingleValueMetricAggregation {}
class SumAggregation extends SingleValueMetricAggregation {}
class ValueCountAggregation extends SingleValueMetricAggregation {
    missing() {
        // Not existent for this aggregation
        return this;
    }
}
class CardinalityAggregation extends SingleValueMetricAggregation {
    _precision_threshold: number;
    constructor(name: string, object: Object = {}) {
        super(name, object);
        this._precision_threshold = 'precision_threshold' in object ? object.precision_threshold : 3000; // Default in ES;
    }

    precision_threshold(n: number) {
        if (typeof n !== 'number') {
            return this;
        }
        this._precision_threshold = n;
        return this;
    }

    generate(): Object {
        const obj = super.generate();
        obj[this._name].cardinality.precision_threshold = this._precision_threshold;
        return obj;
    }
}

class MultiValueMetricAggregation extends SingleValueMetricAggregation {
}

class ExtendedStatsAggregation extends MultiValueMetricAggregation {
    _sigma: ?number;
    constructor(name: string, object: Object = {}) {
        super(name, object);
        this._sigma = 'sigma' in object ? object.sigma : null;
    }

    sigma(v: number): Aggregation {
        this._sigma = v;
        return this;
    }

    generate(): Object {
        return this;
    }
}

class StatsAggregation extends MultiValueMetricAggregation {
    generate(): Object {
        return this;
    }
}

class PercentilesAggregation extends MultiValueMetricAggregation {
    _percents: Array<number>;
    _keyed: boolean;
    _hdr_significant_value_digits: number;
    _hdr: boolean;
    constructor(name: string, object: Object = {}) {
        super(name, object);
        this._percents = 'percents' in object ? object.percents : [];
        this._keyed = 'keyed' in object ? object.keyed : true;
        this._hdr = 'hdr' in object;
        this._hdr_significant_value_digits = 'hdr' in object
            && 'number_of_significant_value_digits' in object.hdr ? object.hdr.number_of_significant_value_digits : 3;
    }

    percents(arr: Array<number>): Aggregation {
        this._percents = arr;
        return this;
    }

    keyed(b: boolean): Aggregation {
        this._keyed = b;
        return this;
    }

    hdr_significant_digits(d: number): Aggregation {
        this._hdr = true;
        this._hdr_significant_value_digits = d;
        return this;
    }

    generate(): Object {
        return this;
    }
}

class PercentileRanksAggregation extends PercentilesAggregation {
    _values: Array<number>;
    constructor(name: string, object: Object = {}) {
        super(name, object);
        this._values = 'values' in object ? object.values : [];
    }

    values(arr: Array<number>): Aggregation {
        this._values = arr;
        return this;
    }

    generate(): Object {
        return this;
    }
}

class BucketAggregation extends Aggregation {
    _sub_aggregations: Array<Aggregation>;
    _keyed: boolean;
    constructor(name: string, object: Object = {}) {
        super(name, object);
        this._sub_aggregations = [];
        this._keyed = 'keyed' in object ? object.keyed : false;
    }

    aggregation(agg: Aggregation) {
        this._sub_aggregations.push(agg);
        return this;
    }
}

class NestedAggregation extends BucketAggregation {
    _path: ?string;
    constructor(name: string, object: Object = {}) {
        super(name, object);
        this._path = 'path' in object ? object.path : null;
    }

    path(p: string) {
        this._path = p;
        return this;
    }

    generate() {
        return {
            [this._name]: {
                nested: {
                    path: this._path,
                },
                aggs: this._sub_aggregations.reduce((obj, agg) => {
                    obj = _.merge(obj, agg.generate());
                    return obj;
                }, {}),
            },
        };
    }
}

class FilterAggregation extends BucketAggregation {
    _query: ?Object;
    constructor(name: string, object: Object = {}) {
        super(name, object);
        this._query = null;
    }

    query(q: Object) {
        this._query = q;
        return this;
    }

    generate() {
        return {
            [this._name]: {
                filter: this._query == null ? {} : this._query,
                aggs: this._sub_aggregations.reduce((obj, agg) => {
                    obj = _.merge(obj, agg.generate());
                    return obj;
                }, {}),
            },
        };
    }
}

class TermsAggregation extends BucketAggregation {
    _include: ?string | ?Array<string>;
    _exclude: ?string | ?Array<string>;
    _missing: any;
    _size: number;
    _shard_size: number;
    _min_doc_count: number;
    _shard_min_doc_count: number;
    _order: ?Object;

    constructor(name: string, object: Object = {}) {
        super(name, object);
        this._include = 'include' in object ? object.include : null;
        this._exclude = 'exclude' in object ? object.exclude : null;
        this._missing = 'missing' in object ? object.missing : null;
        this._size = 'size' in object ? object.size : 10;
        this._shard_size = 'shard_size' in object ? object.shard_size : this._size;
        this._min_doc_count = 'min_doc_count' in object ?
            object.min_doc_count : 1;
        this._shard_min_doc_count = 'shard_min_doc_count' in object ?
            object.shard_min_doc_count : 1;
        // Check with an enum TODO
        this._collect_mode = 'collect_mode' in object ? object.collect_mode : null;
        this._order = 'order' in object ? this._extract_order(object.order) : null;
    }

    _extract_order(order: Object): ?Object {
        if (order && Object.keys(order).length === 1) {
            const keys = Object.keys(order);
            const key = keys[0];
            if (order[key] === 'desc' || order[key] === 'asc') {
                return order;
            }
            return null;
        }
        return null;
    }

    include(inc: string | Array<string>) {
        this._include = inc;
        return this;
    }

    exclude(exc: string | Array<string>) {
        this._exclude = exc;
        return this;
    }

    missing(m: any) {
        this._missing = m;
        return this;
    }

    size(s: number) {
        this._size = s;
        return this;
    }

    shard_size(s: number) {
        this._shard_size = s;
        return this;
    }

    min_doc_count(dc: number) {
        this._min_doc_count = dc;
        return this;
    }

    shard_min_doc_count(dc: number) {
        this._shard_min_doc_count = dc;
        return this;
    }

    generate() {
        const obj = {
            [this._name]: {
                terms: {
                    field: this._field,
                },
            },
        };

        obj[this._name].terms.size = this._size;
        obj[this._name].terms.shard_size = this._shard_size;
        obj[this._name].terms.shard_size = this._shard_size;
        obj[this._name].terms.min_doc_count = this._min_doc_count;
        obj[this._name].terms.shard_min_doc_count = this._shard_min_doc_count;

        if (this._missing != null) {
            obj[this._name].terms.missing = this._missing;
        }

        if (this._include != null) {
            obj[this._name].terms.include = this._include;
        }

        if (this._exclude != null) {
            obj[this._name].terms.exclude = this._exclude;
        }

        if (this._order != null) {
            obj[this._name].terms.order = this._order;
        }

        if (this._sub_aggregations.length > 0) {
            obj[this._name].aggs = {};
            obj[this._name].aggs = this._sub_aggregations.reduce((o, agg) => {
                o = _.merge(o, agg.generate());
                return o;
            }, obj[this._name].aggs);
        }

        return obj;
    }
}

class DateHistogramAggregation extends BucketAggregation {
    _timezone: ?string;
    _offset: ?string;
    _format: ?string;
    _interval: ?string;
    _missing: any;
    _shard_size: number;
    _min_doc_count: number;

    constructor(name: string, object: Object = {}) {
        super(name, object);
        this._missing = 'missing' in object ? object.missing : null;
        this._shard_size = 'shard_size' in object ? object.shard_size : this._size;
        this._min_doc_count = 'min_doc_count' in object ?
            object.min_doc_count : 1;
        this._format = 'format' in object ? object.format : null;
        this._timezone = 'timezone' in object ? object.timezone : null;
        this._interval = 'interval' in object ? object.interval : null;
        this._offset = 'offset' in object ? object.offset : null;
    }

    missing(m: any) {
        this._missing = m;
        return this;
    }

    shard_size(s: number) {
        this._shard_size = s;
        return this;
    }

    min_doc_count(dc: number) {
        this._min_doc_count = dc;
        return this;
    }

    format(f: string): DateHistogramAggregation {
        this._format = f;
        return this;
    }

    timezone(tz: string): DateHistogramAggregation {
        this._timezone = tz;
        return this;
    }

    interval(inter: string): DateHistogramAggregation {
        this._interval = inter;
        return this;
    }

    generate() {
        const obj = {
            [this._name]: {
                date_histogram: {
                    field: this._field,
                },
            },
        };

        obj[this._name].date_histogram.shard_size = this._shard_size;
        obj[this._name].date_histogram.shard_size = this._shard_size;
        obj[this._name].date_histogram.min_doc_count = this._min_doc_count;

        if (this._format) {
            obj[this._name].date_histogram.format = this._format;
        }

        if (this._timezone) {
            obj[this._name].date_histogram.time_zone = this._timezone;
        }

        if (this._interval) {
            obj[this._name].date_histogram.interval = this._interval;
        }

        if (this._offset) {
            obj[this._name].date_histogram.offset = this._offset;
        }

        if (this._missing != null) {
            obj[this._name].date_histogram.missing = this._missing;
        }

        if (this._sub_aggregations.length > 0) {
            obj[this._name].aggs = {};
            obj[this._name].aggs = this._sub_aggregations.reduce((o, agg) => {
                o = _.merge(o, agg.generate());
                return o;
            }, obj[this._name].aggs);
        }

        return obj;
    }
}

module.exports = {
    Aggregation,
    BucketAggregation,
    SingleValueMetricAggregation,
    MultiValueMetricAggregation,
    AvgAggregation,
    MinAggregation,
    MaxAggregation,
    SumAggregation,
    ValueCountAggregation,
    CardinalityAggregation,
    ExtendedStatsAggregation,
    StatsAggregation,
    PercentilesAggregation,
    PercentileRanksAggregation,
    NestedAggregation,
    FilterAggregation,
    TermsAggregation,
    DateHistogramAggregation,
};
