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
If the input value is outside 10-20, it will turn red.

---

# How to use Generic Table Components

เราได้สร้าง Generic Component ขึ้นมา 2 ตัวหลักๆ เพื่อลด Code Duplication และจัดการ Logic การเดิน Focus (UseGridNavigation) ให้ง่ายขึ้น

## 1. PitchingTable

ใช้สำหรับ Pitching Table และ Rolling Table แบบมาตรฐาน (ที่มีโครงสร้างซับซ้อน เช่น Top/Bottom, Rows/Cols)

### Props

| Property | Type | Description |
| :--- | :--- | :--- |
| `axis` | `'x' \| 'y'` | **Layout Axis**: `'x'` = Horizontal, `'y'` = Vertical |
| `arrowAxis` | `'x' \| 'y'` | **Arrow Direction**: ใช้บังคับทิศทางลูกศร. เช่น RollingX เป็น Layout X แต่ใช้ลูกศรขึ้นลง (Y) ให้ส่ง `'y'` |
| `config` | `Object` | การตั้งค่า Row/Column และ Data Mapping |
| `data` | `Object` | Data object จาก RHF (เช่น `{ b: [], t: [] }`) |
| `standard` | `Object` | `{ min: -10, max: 10 }` |

### Config Structure

```js
const config = {
    // Array ของ Row ที่จะ Map กับ Data Key (เช่น 'b' หรือ 't')
    rows: [
        { key: 'b', label: 'B (Before)' }, 
        { key: 't', label: 'T (Top)' }
    ],
    // Array ของ Column Header
    cols: [
        { label: 'X+' }, 
        { label: 'X0', isRef: true }, // isRef = คอลัมน์อ้างอิง (สีเทา/ข้าม)
        { label: 'X-' }
    ],
    // Label ของ Diff Row
    diffLabel: 'DIFF',
    // Header หลัก
    dataLabel: 'PITCHING' 
}
```

### Examples

#### Pitching X (Layout X, Arrow X)
```jsx
<PitchingTable
    axis="x"     // แนวนอน
    arrowAxis="x" // ลูกศรซ้ายขวา
    config={{ ... }}
    data={data}
```
---

## 4. FormHorizontalTableSingleRow

ใช้สำหรับตารางตรวจสอบแนวนอนที่มีเพียงแถวเดียว (Single Row) เช่น Straightness Check ใน FAMB0007_V3 หรือตารางที่เน้นการกรอกข้อมูลแบบรวดเร็วและมีการคำนวณ Diff (Max-Min) อัตโนมัติ

### Features

-   **Compact Layout**: แสดงผลเป็นตารางแนวนอนแถวเดียว พร้อม Label ด้านซ้าย
-   **Auto Diff calculation**: คำนวณค่าสูงสุด-ต่ำสุด (Max-Min) ให้อัตโนมัติ (ซ่อน/แสดงได้)
-   **Configurable Arrows**: เลือกแสดงผลเป็นตัวเลขปกติหรือแบบมีลูกศร (↑/↓) ผ่าน prop `showArrows`
-   **Validation**: รองรับการตรวจสอบค่ามาตรฐาน (STD) ทั้งแบบรายช่อง และแบบขอบเขตความต่าง (Diff)

### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | - | **Required**. RHF field name (เช่น `"p03_front_z"`) |
| `header` | `string` | - | หัวข้อคอลัมน์แรกด้านบน (เช่น `"Front"`) |
| `label` | `string` | - | ชื่อแถวด้านซ้าย (เช่น `"Z"`) |
| `cols` | `number` | `7` | จำนวนคอลัมน์ข้อมูล |
| `headerStart` | `number` | `0` | ตัวเลขเริ่มต้นของหัวตาราง (0, 1, 2...) |
| `axis` | `string` | `"x"` | แกนข้อมูล (x/y) สำหรับการจัดการลูกศร |
| `standard` | `number` | `5` | ค่ามาตรฐานสำหรับ Diff (Max-Min) |
| `showArrows` | `boolean` | `false` | แสดงลูกศรหน้าตัวเลขหรือไม่ |
| `validateStd` | `boolean` | `false` | เปิดการตรวจสอบค่า Standard รายช่องหรือไม่ |
| `standards` | `Array` | `[]` | รายการ Standard รายคอลัมน์ `[{ min, max, ... }]` |

### Examples

#### Simple Usage (Straightness Style)
กรอกตัวเลขปกติ ไม่แสดงลูกศร และเช็คค่า Diff ไม่เกิน 5 µm
```jsx
<FormHorizontalTableSingleRow
    name="p3_front_z"
    header="Front"
    label="Z"
    standard={5}
    showArrows={false}
/>
```

#### Advanced Usage (with Arrows & Validation)
แสดงลูกศร และเช็คค่ามาตรฐานรายช่อง
```jsx
<FormHorizontalTableSingleRow
    name="p3_axis_check"
    header="Check"
    label="Y"
    showArrows={true}
    validateStd={true}
    standards={[
        { maxDiff: 2 }, // Point 0
        { maxDiff: 2 }, // Point 1
        // ...
    ]}
/>
```
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

---

# How to use Generic Table Components

เราได้สร้าง Generic Component ขึ้นมา 2 ตัวหลักๆ เพื่อลด Code Duplication และจัดการ Logic การเดิน Focus (UseGridNavigation) ให้ง่ายขึ้น

## 1. PitchingTable

ใช้สำหรับ Pitching Table และ Rolling Table แบบมาตรฐาน (ที่มีโครงสร้างซับซ้อน เช่น Top/Bottom, Rows/Cols)

### Props

| Property | Type | Description |
| :--- | :--- | :--- |
| `axis` | `'x' \| 'y'` | **Layout Axis**: `'x'` = Horizontal, `'y'` = Vertical |
| `arrowAxis` | `'x' \| 'y'` | **Arrow Direction**: ใช้บังคับทิศทางลูกศร. เช่น RollingX เป็น Layout X แต่ใช้ลูกศรขึ้นลง (Y) ให้ส่ง `'y'` |
| `config` | `Object` | การตั้งค่า Row/Column และ Data Mapping |
| `data` | `Object` | Data object จาก RHF (เช่น `{ b: [], t: [] }`) |
| `standard` | `Object` | `{ min: -10, max: 10 }` |

### Config Structure

```js
const config = {
    // Array ของ Row ที่จะ Map กับ Data Key (เช่น 'b' หรือ 't')
    rows: [
        { key: 'b', label: 'B (Before)' }, 
        { key: 't', label: 'T (Top)' }
    ],
    // Array ของ Column Header
    cols: [
        { label: 'X+' }, 
        { label: 'X0', isRef: true }, // isRef = คอลัมน์อ้างอิง (สีเทา/ข้าม)
        { label: 'X-' }
    ],
    // Label ของ Diff Row
    diffLabel: 'DIFF',
    // Header หลัก
    dataLabel: 'PITCHING' 
}
```

### Examples

#### Pitching X (Layout X, Arrow X)
```jsx
<PitchingTable
    axis="x"     // แนวนอน
    arrowAxis="x" // ลูกศรซ้ายขวา
    config={{ ... }}
    data={data}
    ...
/>
```

#### Rolling X (Layout X, Arrow Y) *Special Case*
Rolling X วางแนวนอน แต่ลูกศรที่ใช้กรอกเป็น ขึ้น/ลง
```jsx
<PitchingTable
    axis="x"     // แนวนอน
    arrowAxis="y" // **สำคัญ**: บังคับใช้ arrow ขึ้นลง
    config={{ ... }}
    data={data}
    ...
/>
```

---

## 2. EDMTable

ใช้สำหรับตาราง EDM เช่น EDM Pitching, EDM Rolling ซึ่งมีโครงสร้างเรียบง่ายกว่า (Row/Col แบบ 1, 2, 3...) แต่มี Standard แยกรายช่อง

### Props

| Property | Type | Description |
| :--- | :--- | :--- |
| `axis` | `'x' \| 'y'` | **Layout Axis**: `'x'` = Horizontal, `'y'` = Vertical |
| `arrowAxis` | `'x' \| 'y'` | **Arrow Direction**: บังคับทิศทางลูกศร (เหมือน PitchingTable) |
| `count` | `number` | จำนวน Row หรือ Column |
| `standards` | `Array` | Array ของ Standard object `[{ min, max, arrow }, ...]` |

### Examples

#### EDM Pitching X (Layout X, Arrow X)
```jsx
<EDMTable
    axis="x"
    arrowAxis="x"
    count={5}
    standards={[
        { min: 0, max: 5, arrow: '+' },
        { min: 0, max: 2, arrow: '-' }
    ]}
    data={data}
    ...
/>
```

#### EDM Rolling X (Layout X, Arrow Y)
```jsx
<EDMTable
    axis="x"
    arrowAxis="y" // **สำคัญ**: Rolling X ใช้ arrow ขึ้นลง
    count={5}
    standards={{ ... }}
    data={data}
    ...
/>
```

---

## 3. FormEDMTableStraightness

ใช้สำหรับตาราง Straightness Check ที่ต้องการแสดงกราฟประกอบข้อมูลโดยอัตโนมัติ เหมาะสำหรับข้อมูลที่มีจำนวนแถวมาก (เช่น 30-60 แถว)

### Features

-   **Auto Graph**: พล็อตกราฟเส้นเชื่อมจุดข้อมูลให้อัตโนมัติทางด้านขวาของตาราง
-   **Dynamic Sizing**: รองรับการปรับขนาดความกว้างตาราง ความสูงแถว และขนาดตัวอักษร เพื่อให้แสดงผลข้อมูลจำนวนมากในหน้าเดียวได้
-   **Validation**: มีการคำนวณ Diff (Max - Min) และตรวจสอบกับค่า Standard ให้ทันที (แสดงแถบสีแดงถ้าเกินค่ามาตรฐาน)

### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | - | **Required**. RHF field name prefix (เช่น `"p10_data_left"`) |
| `title` | `string` | `"Straight of X Axis"` | หัวข้อตาราง |
| `rowCount` | `number` | `31` | จำนวนแถวข้อมูล |
| `strokeStep` | `number` | `20` | ค่าที่เพิ่มขึ้นในแต่ละขั้น (Stroke) |
| `standard` | `number` | `3` | ค่ามาตรฐาน (Diff ต้องไม่เกินค่านี้) |
| `fontSize` | `string` | `"text-xs"` | Tailwind class สำหรับขนาดตัวอักษร (เช่น `"text-[10px]"`) |
| `width` | `string` | `"280px"` | ความกว้างรวมของ Component |
| `colWidths` | `string[]` | `['w-8', 'w-10', 'w-12']` | Array กำหนดความกว้างของคอลัมน์ [Index, Stroke, Value] |
| `rowHeight` | `number` | `16` | ความสูงของแต่ละแถว (pixels) |

### Examples

#### Standard Usage
ใช้ค่า Default สำหรับตารางขนาดปกติ (ประมาณ 30 แถว)
```jsx
<FormEDMTableStraightness
    name="Page13.straightnessData"
    title="Straight of X Axis"
    rowCount={30}
    standard={3}
    defaultValue={{}}
/>
```

#### Compact Usage (High Density)
ใช้สำหรับตารางที่มีข้อมูลจำนวนมาก (เช่น 60+ แถว) เพื่อให้ยัดลงในหน้าเดียวได้
```jsx
<FormEDMTableStraightness
    name="Page10.straightnessDataLeft"
    title="Straight of X Axis"
    rowCount={61}
    strokeStep={20}
    standard={3}
    // Custom Sizing for Compact View
    // Custom Sizing for Compact View
    fontSize="text-[10px]"       // ลดขนาดตัวอักษร
    rowHeight={12}               // ลดความสูงแถว
    width="300px"                // ปรับความกว้างตาราง
    colWidths={['w-6', 'w-8', 'w-10']} // ปรับความกว้างคอลัมน์
    defaultValue={{}}
/>
```

---

## 5. FormTableEntoSingleDir

ใช้สำหรับตาราง Ento Check ที่ต้องการตรวจสอบทิศทางเดียว (เช่น ขาขึ้นอย่างเดียว) โดยไม่มีการสลับฟันปลา (Snake) และไม่มีคอลัมน์ Diff ในตาราง

### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | - | **Required**. RHF field name prefix |
| `sections` | `Array` | `[{ cols: ['Z1', 'Z2'] }]` | กำหนดโครงสร้างคอลัมน์ |
| `rowCount` | `number` | `16` | จำนวนแถวข้อมูล (Default: 0-300 step 20) |
| `topHeader` | `string` | `null` | ข้อความ Header ด้านบนสุด (span all columns) |
| `maxValue` | `number` | `15` | ค่าสูงสุดสำหรับ Validation |

### Example

```jsx
<FormTableEntoSingleDir 
    name="p7_ento_side"
    topHeader="[X-Axis = 150 mm] [Y-Axis = 300-400 mm]"
    sections={[{ cols: ['Z1', 'Z2'] }]}
    rowCount={16}
/>
```

