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
{ 
  reading: "p01_reading_1", 
  reading_min: 10, 
  reading_max: 20 
}
```
If the input value is outside 10-20, it will turn red.

---

# How to use ShapedCheckGroup

`ShapedCheckGroup` เป็น Component สำหรับสร้างกลุ่ม Checkbox รูปทรง (□ ○ △) พร้อมปุ่มถ่ายภาพ/ดูภาพใต้แต่ละอัน เหมาะสำหรับหน้า Visual Inspection ที่ต้องมีการตรวจสอบหลายขั้นตอน

## Features

-   **3 รูปทรง**: □ (Square), ○ (Circle), △ (Triangle) แทน Check 1, 2, 3
-   **Tristate**: กดวนรอบ 4 สถานะ: `ว่าง → ✓ (Pass) → ✗ (Fail) → N/A → ว่าง`
-   **Image Upload**: แต่ละรูปทรงมีปุ่มกล้องสำหรับถ่ายภาพประกอบ
-   **Image View**: เมื่อมีภาพแล้ว กดดูและจัดการได้ (เปลี่ยน/ลบ พร้อม Confirmation)

## Props

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | ✅ | Base field name (เช่น `"p06_ctrl_area1"`) |
| `apiEndpoint` | `string` | ✅ | API endpoint สำหรับ upload (เช่น `"http://localhost:3000/api"`) |
| `uploadFolder` | `string` | ❌ | Folder สำหรับเก็บภาพ (default: `'double_check'`) |
| `extraData` | `object` | ❌ | ข้อมูลเพิ่มเติมสำหรับ upload (เช่น `{ model, machine_no, part_name }`) |
| `className` | `string` | ❌ | CSS classes เพิ่มเติม |
| `required` | `boolean` | ❌ | ถ้า `true` ต้องเลือกสถานะทุกรูปทรง จะแสดงขอบแดงถ้ายังไม่ได้กรอก (default: `false`) |
| `visibleShapes` | `Array<number>` | ❌ | กำหนด shape ที่ต้องการแสดง: `1`=□, `2`=○, `3`=△ (default: `[1,2,3]`) |
| `showCamera` | `boolean` | ❌ | ถ้า `true` แสดงปุ่มกล้องถ่ายภาพ, ถ้า `false` ซ่อนปุ่มกล้อง (default: `true`) |

## Form Data Structure

Component จะ register fields ดังนี้ (โดย `{name}` คือ prop `name` ที่ส่งเข้ามา):

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `{name}_c1_check` | `string` | สถานะ Check 1: `'pass'`, `'fail'`, `'na'`, หรือ `null` |
| `{name}_c2_check` | `string` | สถานะ Check 2 |
| `{name}_c3_check` | `string` | สถานะ Check 3 |
| `{name}_c1_image` | `string` | ชื่อไฟล์ภาพ Check 1 (relative path บน server) |
| `{name}_c2_image` | `string` | ชื่อไฟล์ภาพ Check 2 |
| `{name}_c3_image` | `string` | ชื่อไฟล์ภาพ Check 3 |

## Tristate Behavior

กดที่รูปทรง (□ ○ △) จะวนรอบ 4 สถานะ:

| ลำดับ | สถานะ | สัญลักษณ์ | สี | ค่าใน Form |
| :---: | :--- | :---: | :--- | :--- |
| 1 | ว่าง | - | - | `null` |
| 2 | ผ่าน | ✓ | เขียว | `'pass'` |
| 3 | ไม่ผ่าน | ✗ | แดง | `'fail'` |
| 4 | ไม่ใช้งาน | N/A | เทา | `'na'` |

## Basic Usage

```jsx
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import { apiEndpoint } from "../FORMNAME-setting";

function MyPage() {
    return (
        <ShapedCheckGroup
            name="p06_ctrl_area1"
            apiEndpoint={apiEndpoint}
        />
    );
}
```

## Advanced Usage with Extra Data

```jsx
import { useFormContext, useWatch } from 'react-hook-form';

function Page6() {
    const { control } = useFormContext();
    
    // Watch form metadata for folder naming
    const currentModel = useWatch({ control, name: 'model' }) || 'UNKNOWN';
    const currentMachineNo = useWatch({ control, name: 'machine_no' }) || 'UNKNOWN';

    return (
        <ShapedCheckGroup
            name="p06_ctrl_area1"
            apiEndpoint={apiEndpoint}
            uploadFolder="double_check"
            extraData={{
                model: currentModel,
                machine_no: currentMachineNo,
                part_name: "Controller_Area1"
            }}
        />
    );
}
```

## Positioning on Images (Absolute)

สำหรับหน้า Visual Inspection ที่ต้องวาง Checkbox ซ้อนบนรูปภาพ:

```jsx
import controllerImg from "@/assets/FORMNAME/controller.png";

function Page6() {
    // Define positions for each inspection area
    const areas = [
        { id: 1, name: "area1", top: "11%", left: "46%" },
        { id: 2, name: "area2", top: "16%", left: "88%" },
        { id: 3, name: "area3", top: "31%", left: "16%" },
    ];

    return (
        <div className="relative">
            {/* Background Image */}
            <img src={controllerImg} alt="Controller" className="w-full" />
            
            {/* Positioned Check Groups */}
            {areas.map((area) => (
                <div
                    key={area.id}
                    className="absolute bg-white/95 rounded px-1 py-0.5 shadow-sm"
                    style={{ top: area.top, left: area.left }}
                >
                    <ShapedCheckGroup
                        name={`p06_ctrl_${area.name}`}
                        apiEndpoint={apiEndpoint}
                        extraData={{ part_name: `Controller_${area.name}` }}
                    />
                </div>
            ))}
        </div>
    );
}
```

## Image Upload Behavior

-   **ก่อนถ่ายภาพ**: แสดงปุ่มกล้อง 📷
-   **ระหว่าง Upload**: แสดง Loading Spinner
-   **หลังถ่ายภาพ**: แสดงปุ่มดูภาพ 🖼️
-   **กดดูภาพ**: เปิด Modal แสดงภาพเต็ม พร้อมปุ่ม "เปลี่ยนภาพ" และ "ลบ"
-   **Confirmation**: มี Dialog ยืนยันก่อนเปลี่ยน/ลบภาพ

## Server-Side Folder Structure

ภาพที่ upload จะถูกเก็บในโครงสร้าง:
```
double_check/{year}/{month}/{model}/{machine_no}/image/{filename}
```

ตัวอย่าง: `double_check/2026/02/AL400G/NO.1/image/AL400G-NO.1-Controller_Area1-Check1-1234.jpg`
