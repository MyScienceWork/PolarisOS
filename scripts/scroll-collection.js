const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    node: 'http://localhost:9200',
});

let numberOfRecods = 0;

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function initInternalCollection(idInternalCollection) {
    await client.update({
        index: 'pos_publication',
        type: 'publication',
        id: idInternalCollection,
        body: {
            doc: {
                diffusion: {
                    internal_collection2: [],
                },
                denormalization: {
                    diffusion: {
                        internal_collection2: [],
                    },
                },
            },
        },
    }, (errorUpdate) => {
        if (errorUpdate) {
            console.warn('error : ', errorUpdate);
        }
    });
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// first we do a search, and specify a scroll timeout
client.search({
    index: 'pos_publication',
    type: 'publication',
    scroll: '10s',
    body: {
        query: {
            match_all: {},
        },
    },
}, async function getMoreUntilDone(error, response) {
    // collect all the records
    asyncForEach(response.hits.hits,async (hit) => {
        const source = hit._source;
        numberOfRecods += 1;
        if (source.diffusion.internal_collection && source.diffusion.internal_collection !== '') {
            // console.log('id : ', hit._id);
            // console.log('hit.internal_collection : ', source.diffusion.internal_collection);

            const responseInternalCollection = await client.search({
                index: 'pos_internal_collection',
                type: 'internal_collection',
                body: {
                    query: {
                        match: {
                            _id: source.diffusion.internal_collection,
                        },
                    },
                },
            });

            if (responseInternalCollection.hits.total === 1) {
                const sourceInternalCollection = responseInternalCollection.hits.hits[0]._source;

                await client.update({
                    index: 'pos_publication',
                    type: 'publication',
                    id: hit._id,
                    body: {
                        doc: {
                            diffusion: {
                                internal_collection2: [{
                                    _id: source.diffusion.internal_collection,
                                }],
                            },
                            denormalization: {
                                diffusion: {
                                    internal_collection2: [{
                                        _id: {
                                            label: sourceInternalCollection.label,
                                        },
                                    }],
                                },
                            },
                        },
                    },
                }, (errorUpdate) => {
                    if (errorUpdate) {
                        console.warn('error : ', errorUpdate);
                    }
                });
            } else {
                await initInternalCollection(hit._id);
            }
        } else {
            await initInternalCollection(hit._id);
        }
        await sleep(500);
    });

    if (response.hits.total !== numberOfRecods) {
    // now we can call scroll over and over
        await client.scroll({
            scrollId: response._scroll_id,
            scroll: '10s',
        }, getMoreUntilDone);
    } else {
        console.log('all done', numberOfRecods);
    }
});
