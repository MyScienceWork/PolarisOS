const GenericError = require('./generic');

module.exports = {
    /**
     * Error sent when no authorization header is found in a request
     */
    NoAuthorizationHeaderError: new GenericError('NoAuthorizationHeaderError',
        new Error('No authorization header found. You should provide an Authorization header with Authorization: api_key:signature.'),
    417),

    /**
     * Error sent when the authorization header is not composed of two parts
     */
    NoTwoPartAuthorizationError: new GenericError('NoTwoPartAuthorizationError',
        new Error('Authorization header should be of two parts: api_key:signature.'),
    417),

    /**
     * Error sent when the API key is invalid
     */
    InvalidAPIKey: new GenericError('InvalidAPIKey',
        new Error('API Key does not exist.'),
    403),

    /**
     * Error sent when the account is locked
     */
    AccountIsLocked: new GenericError('AccountIsLocked',
        new Error('Your account is locked. Please contact an administrator.'),
    403),

    /**
     * Error sent when the request signature is invalid
     */
    InvalidSignature: new GenericError('InvalidSignature',
        new Error('The signature does not match.'),
    403),

    /**
     * Error sent when the timestamp for a request is invalid (to avoid replay attacks)
     */
    InvalidTimestamp: new GenericError('InvalidTimestamp',
        new Error('Invalid timestamp.'),
    403),

    /**
     * Error sent when the route is invalid (or the user does not access to it).
     */
    InvalidRoute: new GenericError('InvalidRoute',
        new Error('You don\'t have access to this route.'),
    403),

    /**
     * Error sent when the URL is invalid (it is not a correct URL)
     */
    InvalidURL: new GenericError('InvalidURL',
        new Error('The string you provided is not an URL.'),
    422),

    /**
     * Error sent when the fair use for API access is exceeded
     */
    FairUseExceeded: new GenericError('FairUseExceeded',
        new Error('You are in testing phase and you have exceeded your fair use. Now you should only register people by name.'),
    403),

    /**
     * Error sent when the rate limit for API access is exceeded
     */
    RateLimitExceeded: new GenericError('RateLimitExceeded',
        new Error('You have exceeded the max number of requests per minutes.'),
    429),

    /**
     * Error sent when the entity is invalid (does not exist)
     */
    InvalidEntity: new GenericError('InvalidEntity', new Error('This entity is invalid. Check the ID'), 422),

    /**
     * Error sent when a nested object does not exist
     */
    InvalidSubobject: new GenericError('InvalidSubobject', new Error('The object does not exist. You should include it.'), 422),

    /**
     * Error sent when an object is invalid
     */
    InvalidObject: new GenericError('InvalidObject', new Error('The object (search, sort or aggregation) is invalid.'), 422),

    /**
     * Error sent when an entity with a given ID already exists
     */
    AlreadyExistingEntity: new GenericError('AlreadyExistingEntity',
        new Error('This entity already exists'), 409),

    /**
     * Error sent when the entity couldn't be created
     */
    UnableToCreateEntity: new GenericError('UnableToCreateEntity', new Error('Unable to create entity'), 422),

    PathDoesNotExist: new GenericError('PathDoesNotExist',
        new Error('Path does not exist'), 422),

    DownloadDoesNotExist: new GenericError('DownloadDoesNotExist',
            new Error('The file you\'ve requested does not exist'), 422),

    UnableToProcessPipelines: new GenericError('UnableToProcessPipelines', new Error('Unable to process pipelines'), 500),

    UserIsNotAnAuthor: new GenericError('UserIsNotAnAuthor', new Error('The user is not attached to an author'), 422),

    NoEndOffsetForString: new GenericError('NoEndOffsetForString', new Error('No end offset for string'), 500),

    UnableToCreateReport: new GenericError('UnableToCreateReport', new Error('Unable to create report for a requested task'), 500),

    DataCite400: new GenericError('DataCiteBadRequest',
        new Error('[DataCite] Unable to create the resource (bad request)'), 400),
    DataCite401: new GenericError('DataCiteUnauthorized',
        new Error('[DataCite] Unable to create the resource (unauthorized)'), 401),
    DataCite403: new GenericError('DataCiteForbidden',
        new Error('[DataCite] Unable to create the resource (forbidden)'), 403),
    DataCite412: new GenericError('DataCitePreconditionFailed',
        new Error('[DataCite] Unable to create the resource (precondition failed), you may not have registered your metadata first'), 412),
    DataCite415: new GenericError('DataCiteWrongContentType',
        new Error('[DataCite] Unable to create the resource (wrong content type)'), 415),
    DataCite422: new GenericError('DataCiteWrongContent',
        new Error('[DataCite] Unable to create the resource (wrong content)'), 422),
};
