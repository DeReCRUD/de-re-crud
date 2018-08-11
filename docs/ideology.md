# De Re CRUD
#### Never write a CRUD API or maintenance screen again!

If you are a developer building business apps, the odds are that you
and/or your colleagues spend too much time building and maintaining
basic
[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
APIs and maintenance screens for all the data your app needs.  The worst
part is that a significant percentage of it is not even processed to
add value, merely stored and displayed (think of all the description
fields, notes, instructions, comments, etc).  Your time is usually the
most expensive resource for software companies.  That time should be
spent writing software that adds significant value to your company
and/or your company's customers.

We at De Re CRUD think that the mechanical operation of providing CRUD
APIs and screens with proper validation, error handling, security, and
lots more can be written once and simply applied to your data.  As a
side benefit, you will get tools to help you define, document, and
publish the schema for your model.  And for just three additional
payments, no wait, I've seen too many infomercials, this is open source,
you don't have to pay to use this.  Seriously though, you can use the
APIs internally and get the same features in the parts you build.

All this is not to say that you should not have a model layer in your
application.  We think that you should, we just think that the model
should not be cluttered with simple repetitive validation, security,
auditing, etc. logic.  We envision a future where you can define the
data with all its formatting, validation, and relationships together
with the prompts, hints, and help text so that it can all be used
effectively.  SQL databases have long provided a portion of this, but
they lack several critical pieces, for example user text like prompts
and useful error messaging.  Plus, lots of systems are moving away from
SQL databases.  Using a schemaless database does not mean you don't have
a schema, rather it just means the database is not enforcing the schema.

## All you need is five simple steps

Getting started only takes five fairly simple steps.  You don't even
have to do all of any one step, start small and grow incrementally.

### Step #1 - Define your schema

Enabling the power of De Re CRUD starts by defining the schema for your
model.  We include much more information in the schema than most systems
you have likely used, but it is not more information than you have, you
just did not put it all in one place.  In addition to allowing us to
generate APIs, screens, documentation, and more, putting all this information
together is just a good idea.  Your schema will benefit from
[SPoT/SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth),
[DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), and
[DiE](https://www.rallydev.com/blog/engineering/clean-code-duplication-evil)
principles.  Aside from the obvious benefits of consistent behaviours
and appearance (e.g. changing every occurrence of a field's prompt by
changing it in exactly one place), there are less obvious examples like
improving your teams understanding of the model by seeing more of it at
once.

We will be providing a user friendly tool to define and maintain your
schema.  In a classic example of [Eating Your Own
Dogfood](https://en.wikipedia.org/wiki/Eating_your_own_dog_food), this
tool will be written by defining the schema of a schema and using the
maintenance UIs in the tool with a local storage engine.

### Step #2 - Map your schema to storage

In most cases, your schema will be a logical view of the information,
but the real world requirements of storing that data will impose
restrictions on your layout.  De Re CRUD will provide a simple mapping
between your logical schema and your physical storage.

### Step #3 - Configure the server

We will be providing a server (likely [Node.js](https://nodejs.org/)
based) that will serve the APIs and UIs.  We plan on a modular approach,
so alternate server implementations are possible.  Don't see a server
implementation for your preferred environment, we will provide lots of
documentation to help you write one in your preferred language.

The server will require access to your data storage, so you will need to
configure the storage access via pluggable storage engines.  We will be
providing some standard storage engines, and the interface will be well
documented allowing additional engines to be written.

### Step #4 - Choose your services

The pluggable nature of De Re CRUD will allow you to choose which
services you would like to use.  Each major feature will be a separate
module, so if you don't want APIs, simply disable that module.  Want to
provide a feature of your own design, then just add your module to the
list.

### Step #5 - Start the server

All that is left is to run the server and enjoy never writing a CRUD API
or maintenance screen again!

## Explore in more detail

* [Current features](features.md#current)
* [Planned features](features.md#future)
* [Origin of the project](origins.md)
* [Schema defintion](schema.md)
* [Schema example](../packages/schema-builder/schema.json)