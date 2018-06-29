# How to deploy the solution?

## Deploy to develop with PolarisOS

Every command is run in the root directory of the project (where the package.json is). Every path are relative to this root directory. 

### Prerequisites
- Elasticsearch 5.2
- Node.js 8.9.x (LTS)
- Gulp (latest version, should be install after Node.js using `npm install -g gulp`)
- Minio 2018-04 and onwards (if you plan to host files along with metadata)
- Grobid 0.5.x (if you plan to automatically analyze PDFs to extract metadata)

*NB*: We only support the latest LTS release of Node.js, but we know that the system works on 7.10 and onwards. We do not provide any support for those versions, though.

### Change the configuration files

Configuration files are located in `app/config`. If you plan to have custom installations for both components, we advise you to change the related fields in `app/config/all.js`.

**You need to check that the `index\___prefix` in `app/config/all.js` is set to `msw` before doing anything.** 

### Create the required indices 

PolarisOS needs to create indices into ElasticSearch database. To do so run the following command

```bash
node --harmony create_indices.js --create
```

### Import the sample data

We provide sample data in an archive that you can import to bootstrap the platform.

### Run the platform

In development mode, you should first build the static files then run the Node.js server.

Build the static files:

```bash
gulp default
```

Run the server:

```bash
npm run watch
```

In `watch` mode, any changes to files, automatically re-run the server.

## Deploy PolarisOS in production

You should refer to the Git repository with the Docker configuration to do so.
