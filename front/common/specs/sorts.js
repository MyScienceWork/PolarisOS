module.exports = {
    publication_validation_sorts: [
        { key: 'dates.publication', lang: 'l_sort_by_publication_date' },
        { key: 'dates.update', lang: 'l_sort_by_modification_date' },
        { key: 'dates.deposit', lang: 'l_sort_by_deposit_date' },
        { key: 'denormalization.authors._id.fullname.raw', lang: 'l_sort_by_author' },
        { key: 'denormalization.depositor.lastname.raw', lang: 'l_sort_by_depositor' },
        { key: 'denormalization.reviewer.lastname.raw', lang: 'l_sort_by_reviewer' },
        { key: 'status', lang: 'l_sort_by_status' },
    ],
};
