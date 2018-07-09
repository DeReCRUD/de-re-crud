# Origins of the project

As the old proverb says, there is nothing new under the sun, and that is
very true here.  We have used many tools/libraries in our pasts that
offered some features that influenced our thinking.  Some of the
earliest examples that we actually used include:

* VAX CDDL - a schema definition tool for multiple VAX/VMS programming languages
    used in the mid 1980s.
* VAX FMS - a screen layout tool and library for VAX/VMS used in the
    mid 1980s that let you graphically define your screens with fields
    imported from VAX CDDL.
* HyperCard - a programming tools/database from the late 1980s that
    allowed users to defined their own "card" layout and data schema.

There are multiple modern versions of these kinds of ideas, for example:

* [JSON Schema](http://json-schema.org/) - Expired drafts for a proposed
    internet standard for defining a JSON schema.
* [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) -
    (formerlly known as the Swagger Specification), a spec for defining
    how to call an API.
* [JSON API](http://jsonapi.org/) - The JSON transport from
    [Ember](http://emberjs.com/) expressed as a independant spec.
* [DreamFactory](https://www.dreamfactory.com/) - REST API backend for
    mobile, web, and IoT apps.
* [Angular Schema Form](http://schemaform.io/) - AngularJS directives
    for creating forms from a JSON Schema

While these products are individually nice, they are at this moment,
isolated and independent, requiring the developer to wire them together
to get a useful end product.

We want to change that.  You should be able to get going with all the
features in a very short time, and future changes to your schema should
be very simple and fast to make.