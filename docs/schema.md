# Model

### <a name="struct"></a> Struct

This is the primary object

| Field           | Type                      | Required | Notes                                                  |
| --------------- | ------------------------- | -------- | ------------------------------------------------------ |
| name            | keyword                   | true     | The common name used to identify the type of structure |
| label           | string or [Label](#label) | false    | Describes the struct in the UI                         |
| collectionLabel | string or [Label](#label) | false    | Describes a collection of the struct in the UI         |
| fields          | [Field](#field)[]         | true     | Array of [Fields](#field)                              |
| blocks          | [Block](#block)[]         | true     | Array of [Blocks](#block)                              |

### <a name="field"></a> Field

The property level portions of a [Struct](#struct)

| Field        | Type                                          | Required | Missing Val | Notes                                                                                                              |
| ------------ | --------------------------------------------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| name         | keyword                                       | true     |             | The common name used to describe identify the field                                                                |
| label        | string or [Label](#label)                     | true     |             | Describes the field in the UI                                                                                      |
| type         | string                                        | true     |             | Identifies the [Type](#type) of the field                                                                          |
| keyField     | boolean                                       | false    | false       | Indicates that the field is used as the key or part of a composite key to identify a specific instance of a struct |
| required     | boolean                                       | false    | false       | Indicates that the field is required in order to be saved                                                          |
| unique       | boolean                                       | false    | false       | The field value must be unique across all instances of the same struct                                             |
| initialValue | value consistent with the field [type](#type) | false    |             | The value used when an instance of the struct is created                                                           |
| missingValue | value consistent with the field [type](#type) | false    |             | The value to be used if a value for the struct has not been set                                                    |
| placeholder  | string                                        | false    |             | A string to display in the UI when no value is defined                                                             |
| hints        | [Hint](#hint)                                 | false    |             | Display recomendation to the UI                                                                                    |

#### <a name="field-text"></a> Additional properties for fields of [type](#type) text

| Field     | Type    | Required | Missing Val | Notes                            |
| --------- | ------- | -------- | ----------- | -------------------------------- |
| minLength | integer | false    |             | The minimum length of the value  |
| maxLength | integer | false    |             | The maxiumum length of the value |

#### <a name="field-integer"></a> Additional properties for fields of [type](#type) integer

| Field | Type    | Required | Missing Val | Notes                      |
| ----- | ------- | -------- | ----------- | -------------------------- |
| min   | integer | false    |             | The minimum allowed value  |
| max   | integer | false    |             | The maxiumum allowed value |

#### <a name="field-list"></a> Additional properties for fields of [type](#type) list

| Field   | Type                | Required | Missing Val | Notes                                 |
| ------- | ------------------- | -------- | ----------- | ------------------------------------- |
| options | [option](#option)[] | true     |             | An array of values [options](#option) |

#### <a name="field-foreign-key"></a> Additional properties for fields of [type](#type) foreignKey

| Field     | Type                    | Required | Missing Val | Notes                                         |
| --------- | ----------------------- | -------- | ----------- | --------------------------------------------- |
| reference | [reference](#reference) | true     |             | A [reference](#reference) to the child struct |

#### <a name="field-linked-struct"></a> Additional properties for fields of [type](#type) linkedStruct

| Field        | Type                    | Required | Missing Val | Notes                                         |
| ------------ | ----------------------- | -------- | ----------- | --------------------------------------------- |
| reference    | [reference](#reference) | true     |             | A [reference](#reference) to the other struct |
| minInstances | integer                 | false    |             | The minimum instances                         |
| maxInstances | integer                 | false    |             | The maximum instances                         |

#### <a name="field-derived"></a> Additional properties for fields of [type](#type) derived

| Field   | Type | Required | Missing Val | Notes                                                         |
| ------- | ---- | -------- | ----------- | ------------------------------------------------------------- |
| pattern | text | true     |             | A pattern describing how a value is derived from other fields |

### <a name="type"></a> Type

| Type                                 | Description                                       |
| ------------------------------------ | ------------------------------------------------- |
| [text](#field-text)                  |                                                   |
| keyword                              | A string with no whitespace characters            |
| [integer](#field-integer)            |                                                   |
| estimate                             | The approximation of an decimal value             |
| date                                 |                                                   |
| boolean                              |                                                   |
| percent                              |                                                   |
| money                                |                                                   |
| [foreignKey](#field-foreign-key)     | Indicates a parent relationship of another struct |
| [linkedStruct](#field-linked-struct) | Indicates a relationship to another struct        |
| [list](#field-list)                  | A preset list of possible values                  |
| [derived](#field-derived)            | A value derived from the values of other fields   |
| stamp                                |                                                   |

### <a name="block"></a> Block

A grouping of fields displayed in the UI

| Field     | Type                                                                                 | Required | Notes                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| name      | keyword                                                                              | true     | The common name used to identify the block                                                                                            |
| label     | string or [Label](#label)                                                            | false    | Describes the block in the UI                                                                                                         |
| condition | [condition](#condition)                                                              | false    | [condition](#condition) evaluated to determine if the block should be displayed                                                       |
| fields    | Array of Strings and/or [Conditional Field Reference](#conditional_field_reference)s | true     | Array of [Field](#field) names or [Conditional Field Reference](#conditional_field_reference)s included in the block in display order |
| hints     | [hint](#hint)                                                                        | false    | Display recomendation to the UI                                                                                                       |

### <a name="label"></a> Label

Describes how to label a struct, field, or block. The object must contain as least
one of the following.

| Field  | Data Type | Required | Notes                   |
| ------ | --------- | -------- | ----------------------- |
| short  | string    | false    | The short length label  |
| medium | string    | false    | The medium length label |
| long   | string    | false    | The long length label   |

### <a name="reference"></a> Reference

Describes a relationship to another struct

| Field      | Type    | Required | Missing Val | Notes                                                                                          |
| ---------- | ------- | -------- | ----------- | ---------------------------------------------------------------------------------------------- |
| struct     | keyword | true     |             | The name of the other [struct](#struct)                                                        |
| labelField | string  | true     |             | The name of the [field](#field) whose value will identify the other [struct](#struct) instance |
| block      | string  | false    | default     | The name of the [block](#block) to display in the UI                                           |

### <a name="hint"></a> Hint

Recommendations given to the UI about how to display the form element. Applies to [structs](#struct), [fields](#field), and [blocks](#block).

#### [Field](#field) Hints

##### <a name="field-stamp"></a> Additional properties for hints of [type](#type) stamp

| Field             | Type     | Required | Missing Val | Notes                                                        |
| ----------------- | -------- | -------- | ----------- | ------------------------------------------------------------ |
| headerSize        | integer  | false    |             | The size of the stamp element when display using the `h` tag |
| displayClassNames | string[] | false    |             | The CSS class name to append to the stamp element            |

#### [Block](#block) Hints

##### <a name="block-linked-struct-hint"></a> Additional properties for hints of [type](#type) linkedStruct reference

| Field  | Type   | Required | Missing Val | Notes                                                                                             |
| ------ | ------ | -------- | ----------- | ------------------------------------------------------------------------------------------------- |
| layout | string | false    | inline      | Indicates how to [layout](#block-linked-struct-hint-layout) the [Struct](#struct) instances       |
| block  | string | false    | default     | The name of the [block](#block) to display in the UI, overrides the [Reference](#reference) block |

##### <a name="block-linked-struct-hint-layout"></a> Linked Struct Layout Type

| Type   | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| inline | Displays instances of the reference block within the main displayed block |
| table  | Displays instances of the referenced struct in a table                    |

### <a name="option"></a> Option

| Field | Type                                         | Required | Notes                                      |
| ----- | -------------------------------------------- | -------- | ------------------------------------------ |
| label | string or [Label](#label)                    | true     | The display value for the option in the UI |
| value | value cosistent with the field [type](#type) | true     | The value associated with the option       |

### <a name="conditional_field_reference"></a> Conditional Field Reference

References a Field and defines a condition to be evaluated to determine if the field should be displayed.

| Field     | Type                    | Required | Notes                                                                |
| --------- | ----------------------- | -------- | -------------------------------------------------------------------- |
| field     | string                  | true     | The name of the field to display                                     |
| condition | [condition](#condition) | true     | expression to be evaluated to determine if field should be displayed |

### <a name="conditional"></a> Condition

An expression that if evaluated as truthy or falsy.