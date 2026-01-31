# How to use FormQuickTable

`FormQuickTable` is a powerful component designed to create complex forms with validatable inputs, labels, and checkboxes with minimal configuration.

## Basic Usage

1.  **Define Columns**: Create an array of column objects.
2.  **Define Data**: Create an array of data objects matching your columns.
3.  **Render**: Pass them to `FormQuickTable`.

### Column Configuration (`columns`)

| Property | Type | Description |
| :--- | :--- | :--- |
| `header` | `string` | Text to display in the header. |
| `key` | `string` | Key to access data in the `data` array. |
| `width` | `string` | Width of the column (e.g., `"20%"`). |
| `type` | `string` | `'input'`, `'label'`, `'checkbox'`, `'tristate'`. Defaults to `'label'`. |
| `align` | `string` | `'left'`, `'center'`, `'right'`. Defaults to `'center'`. |

### Data Configuration (`data`)

The `data` array contains objects where keys match the `key` defined in columns.

-   **Input Fields**: The value should be the **react-hook-form name** (e.g., `"p43_v0_present"`).
-   **Labels**: The value is just the text to display.
-   **Mixed Content**: If a column is `type: 'input'`, but the value contains **spaces** (e.g., `"Do not calculate"`), it automatically renders as a **label**.

### Example

```jsx
const columns = [
    { header: "No.", key: "no", width: "10%" }, // Default type is label
    { header: "Reading", key: "reading", width: "40%", type: "input" },
    { header: "Result", key: "result", width: "40%", type: "input" }
];

const data = [
    { no: "1", reading: "p01_reading_1", result: "p01_result_1" },
    { no: "2", reading: "Do not check", result: "N/A" } // Automatically renders as label due to spaces
];

<FormQuickTable columns={columns} data={data} />
```

## Advanced Features

### Row Grouping
To group rows (merge cells vertically), add `rowGroup: true` to the column definition. Adjacent rows with identical values in that column will be merged.

### Checkboxes in Header
Add `headerCheckbox: "form_field_name"` to a column to add a checkbox in the header.

### Validation Styling
For `type: 'input'`, you can add validation rules in the **data row** (not column):
-   `{key}_min`: Minimum value
-   `{key}_max`: Maximum value
-   `{key}_expected`: Expected exact value

Example data row:
```javascript
{ 
  reading: "p01_reading_1", 
  reading_min: 10, 
  reading_max: 20 
}
```
If the input value is outside 10-20, it will turn red.
