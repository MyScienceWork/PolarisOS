# Overview

The global architecture of PolarisOS is based on micro-services talking into each other with a centralized API, that can be directly requested (providing you have a token key and a secret) or used throught the frontend. This gives the ability to used the power of PolarisOS with custom UI/UX or custom services.

We describe the backend architecture and then the frontend architecture.

*N.B.*: We are going to refer to concepts proper to ElasticSearch throughout this section. So you should be at least familiar with the following concepts:
- \_source
- mapping
- field types
- queries
- aggregations

If not, we kindly refer you to the ElasticSearch documentation, for more details.

# Backend architecture

## Entities

PolarisOS is composed of an ensemble of entities (which can be viewed as collections / tables in standard databases). Each entity subclassed the so-called `odm` which is responsible for creation / reads / updates / deletions (CRUD) in *single* or *bulk* mode. The description of the `odm` lies in `app/modules/entities/odm.js`. Please refer to this file for a complete description of the class.

Each entity is composed of:

1. A `subclass` of *ODM*.
2. A `models` directory where the mode (and pipeline) of the entity is expressed.
3. A `controllers` directory where custom controllers for each entity can be expressed.
4. A `routes` directory where custom routes for each entity cas be expressed.

By default, each entity got the following routes (expressed in `app/modules/utils/router.js`) and features:

- `api/public/v{X}/{entity_name}s`: retrieve all documents for this entity with the scroll API of ElasticSearch.
- `api/public/v{X}/{entity_name}s/{projection} : retrieve all documents for this entity with the scroll API of ElasticSearch, but restrict the `\_source` parameters to what is passed to `projection` (separated by a comma).
- `api/public/v{X}/{entity_name}s/{projection}/{population} : retrieve all documents for this entity with the scroll API of ElasticSearch, with a custom projection (can be skipped by leaving the field blank) and using custom population parameters. See the  _Population & Performance_ section for more details on population.
- 
