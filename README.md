# E-Checksheet Template

ระบบ E-Checksheet สำหรับงานตรวจสอบคุณภาพเครื่องจักร EDM (Electrical Discharge Machine) พัฒนาด้วย React + Vite

## 📋 รายละเอียดโปรเจค

ระบบนี้ถูกพัฒนาเพื่อใช้ในการบันทึกและตรวจสอบค่าวัดต่างๆ ของเครื่องจักร EDM โดยมีฟีเจอร์ดังนี้:

- **Digital Checksheet** - แบบฟอร์มตรวจสอบแบบดิจิทัล รองรับการพิมพ์ A4
- **Auto Validation** - ตรวจสอบค่าอัตโนมัติตาม Standard ที่กำหนด
- **Interactive Input** - Auto-focus และ Navigation ที่สะดวก
- **Print Ready** - ออกแบบมาให้พิมพ์ได้ขนาด A4 (210mm x 297mm)

## 🧩 Components หลัก

### Tables & Data Entry
| Component | Description |
|-----------|-------------|
| `TablePitchCheck` | ตารางตรวจสอบ Pitch แบบ A/B พร้อมคำนวณ Diff |
| `TablePitchXYZUV` | ตาราง Pitch 4 แกน (Y1-Y4) พร้อม Last Modified Tracking |
| `TableEnto` | ตารางลงค่าขึ้น-ลง (A up, B down) พร้อม Diff |
| `TableEntoDual` | ตารางคู่ Left/Right พร้อมคำนวณ A+B/A-B |
| `TableStraightness` | ตรวจสอบ Straightness X,Y Axis |
| `EDMTableStraightness` | ตาราง Straightness สำหรับ EDM |

### Measurement & Validation
| Component | Description |
|-----------|-------------|
| `EDMYawingX` / `EDMYawingY` | ตรวจสอบ Yawing X,Y Axis |
| `TableRollingX` / `TableRollingY` | ตรวจสอบ Rolling |
| `TablePitchingX` / `TablePitchingY` | ตรวจสอบ Pitching |
| `LevelTableXAB` / `LevelTableYAB` | ตรวจสอบ Level |

### UI Components
| Component | Description |
|-----------|-------------|
| `ImagePointCheck` | ภาพพร้อม Checkbox ตามตำแหน่ง x,y |
| `OverApproval` | ฟอร์มขออนุมัติ (Checkbox, Name, Date, Reason) |
| `WorkstandCheck` | ตรวจสอบ Workstand 4 โซน (A,B,C,D) |
| `SignBox` | กล่องลายเซ็น |
| `PageHeader` / `TableHeader` | Header สำหรับหน้าเอกสาร |

## 📂 โครงสร้างโปรเจค

```
src/
├── components/          # Reusable components
│   ├── TablePitchCheck.jsx
│   ├── TableEntoDual.jsx
│   ├── ImagePointCheck.jsx
│   └── ...
├── checksheets/         # Checksheet pages
│   └── checksheet1/
│       ├── Checksheet1.jsx  # Main controller
│       ├── Page1.jsx - Page8.jsx
│       └── setting-form1.js
├── pages/               # Main pages
│   └── CoverPage.jsx
└── App.jsx
```

## 🚀 การติดตั้งและใช้งาน

### Prerequisites
- Node.js 18+
- npm หรือ yarn

### Installation
```bash
# Clone repository
git clone https://github.com/JoeKittiphong/checksheet-template.git

# Install dependencies
cd checksheet-template
npm install

# Run development server
npm run dev
```

### Build for Production
```bash
npm run build
```

## ⚙️ การใช้งาน Components

### TablePitchCheck
```jsx
<TablePitchCheck
    data={{ a: [], b: [] }}
    onChange={(newData) => setData(newData)}
    axisLabel="X1"
    rowCount={16}
    stepSize={20}
    maxAB={15}      // Validation: max value for A, B
    maxDiff={1}     // Validation: max for diff
    showCalcCol={true}
/>
```

### TableEntoDual
```jsx
<TableEntoDual
    leftData={{ a: [], b: [] }}
    rightData={{ a: [], b: [] }}
    onLeftChange={setLeftData}
    onRightChange={setRightData}
    rowCount={21}
    stepSize={20}
    maxValue={15}
    maxDiff={1}
    formula="A+B"   // or "A-B"
/>
```

### ImagePointCheck
```jsx
<ImagePointCheck
    backgroundImage="/path/to/image.png"
    width="180mm"
    height="120mm"
    points={[
        { id: 1, x: 10, y: 20, label: 'Head', checked: false, textPosition: 'right' },
        { id: 2, x: 50, y: 30, label: 'Motor', checked: true, textPosition: 'left' }
    ]}
    onChange={(pointId, checked) => handleChange(pointId, checked)}
/>
```

## 📝 Features

### Auto-Focus Navigation
- ระบบ Auto-focus อัตโนมัติเมื่อกด Enter
- รองรับการลงค่าแบบ "ขึ้น-ลง" (เช่น A จากล่างขึ้นบน, B จากบนลงล่าง)

### Validation
- ตรวจสอบค่าเกิน Standard อัตโนมัติ
- แสดงสีแดงเมื่อค่าเกินกำหนด
- รองรับ validation ทั้ง input และค่า calculated

### Print Ready
- ออกแบบขนาด A4 (210mm x 297mm)
- ใช้หน่วย mm สำหรับความแม่นยำในการพิมพ์

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **ESLint** - Code Quality

---

## 📖 Component API Reference

### 📄 Layout Components

#### `A4Paper`
หน้ากระดาษ A4 ขนาดคงที่ (210mm x 297mm)

```jsx
import A4Paper from './components/A4Paper';

<A4Paper className="" innerPadding="">
    {/* เนื้อหาภายใน */}
</A4Paper>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | เนื้อหาภายในกระดาษ |
| `className` | string | `''` | CSS class เพิ่มเติม |
| `innerPadding` | string | `''` | Padding ภายใน |

---

#### `A4blank`
หน้า A4 เปล่าสำหรับใช้เป็นหน้าคั่น

```jsx
import A4blank from './components/A4blank';

<A4blank>
    {/* เนื้อหาที่ต้องการ */}
</A4blank>
```

---

### 📋 Header Components

#### `PageHeader`
หัวกระดาษสำหรับใช้ในทุกหน้าเอกสาร

```jsx
import PageHeader from './components/PageHeader';

<PageHeader
    documentNo="FAEI0158"
    releaseNo="5.0"
    controlBy="Assembly Division"
    title="Check Sheet"
    subtitle="ASSEMBLY"
    company="Sodick (Thailand) Co.,Ltd"
    page="1"
    date="14/09/2017"
    model="T-MASTER"
    group="FINAL INSPECTION"
/>
```

#### `TableHeader`
แสดงส่วนหัวของเอกสารพร้อมข้อมูล Doc Number, Version, Date

```jsx
import TableHeader from './components/TableHeader';

<TableHeader
    docNumber="FAWB0005"
    version="6.0"
    dateOfIssue="7-Apr-2025"
    approvalDate="21-Apr-2025"
    issuedBy="ENGINEERING DIV."
    title="CHECK SHEET BODY ASS'Y"
/>
```

---

### 📝 Form Components

#### `InfoInputForm`
ฟอร์มกรอกข้อมูลเครื่องจักร: Model, Spec, Start/Finish Date, Options

```jsx
import InfoInputForm from './components/InfoInputForm';

const [formData, setFormData] = useState({
    model: '',
    spec: '',
    startDate: '',
    finishDate: '',
    option1: '', option2: '', option3: '', option4: '', option5: ''
});

<InfoInputForm formData={formData} onChange={setFormData} />
```

#### `Checknumber`
กล่องกรอกหมายเลข BED No.

```jsx
import Checknumber from './components/Checknumber';

<Checknumber
    label="BED No."
    value={bedNo}
    onChange={(val) => setBedNo(val)}
    labelClass="text-sm"
    inputClass="w-20 text-sm"
/>
```

#### `CheckedBox`
กล่องสำหรับกรอกชื่อผู้ตรวจและวันที่

```jsx
import CheckedBox from './components/CheckedBox';

<CheckedBox
    name={checkerName}
    date={checkDate}
    onNameChange={(val) => setCheckerName(val)}
    onDateChange={(val) => setCheckDate(val)}
    label="CHECKED BY / DATE"
/>
```

#### `SignBox`
กล่องลงนาม Checked By และ Approved By

```jsx
import SignBox from './components/SignBox';

<SignBox
    formData={{ checkCode: '', checkName: '', approveCode: '', approveName: '' }}
    onChange={(data) => setSignData(data)}
/>
```

#### `OverApproval`
กล่องอนุมัติเคส Over Standard

```jsx
import OverApproval from './components/OverApproval';

<OverApproval
    data={{ isApproved: false, name: '', date: '', reason: '' }}
    onChange={(field, value) => handleChange(field, value)}
/>
```

---

### 🔢 Ceramic Check Components

#### `CeramicCheckEDM`
ตารางตรวจสอบ Ceramic แบบ 3x3 สำหรับ EDM (8 จุด + 1 reference)

```jsx
import CeramicCheckEDM from './components/CeramicCheckEDM';

<CeramicCheckEDM
    data={{ tl: '', tc: '', tr: '', ml: '', mc: '', mr: '', bl: '', br: '' }}
    onChange={(newData) => setData(newData)}
    standard={{ min: -10, max: 10 }}
    parallelStandard={5}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | object | `{}` | ค่าทั้ง 8 จุด (tl, tc, tr, ml, mc, mr, bl, br) |
| `onChange` | function | `() => {}` | callback เมื่อข้อมูลเปลี่ยน |
| `standard` | object | `{ min: -10, max: 10 }` | ค่ามาตรฐาน |
| `parallelStandard` | number | `5` | ค่า max ของ PARALLEL |

#### `CeramicCheckEDW`
ตารางตรวจสอบ Ceramic แบบ 3x3 สำหรับ EDW

```jsx
import CeramicCheckEDW from './components/CeramicCheckEDW';

<CeramicCheckEDW
    data={{ tl: '', tc: '', tr: '', ml: '', mc: '', mr: '', bl: '', br: '' }}
    onChange={(newData) => setData(newData)}
    standard={{ min: -5, max: 5 }}
/>
```

#### `EDMLevelCeramic`
ตาราง Level Check แบบ 3x3 สำหรับ X-Axis และ Y-Axis

```jsx
import EDMLevelCeramic from './components/EDMLevelCeramic';

<EDMLevelCeramic
    dataX={{ tl: '', tc: '', tr: '', ml: '', mr: '', bl: '', br: '' }}
    dataY={{ tl: '', tc: '', tr: '', ml: '', mr: '', bl: '', br: '' }}
    onChangeX={(newData) => setDataX(newData)}
    onChangeY={(newData) => setDataY(newData)}
    standardX={20}
    standardY={20}
/>
```

---

### 📊 Level Tables

#### `LevelTableXAB`
ตารางแสดงข้อมูล Level แบบแนวนอน (คอลัมน์ 1-7)

```jsx
import LevelTableXAB from './components/LevelTableXAB';

<LevelTableXAB
    data={{ b: [], a: [] }}
    onChange={(newData) => setData(newData)}
    standards={[5, 10, 15, 0, -15, -10, -5]}
    cols={7}
/>
```

#### `LevelTableYAB`
ตารางแสดงข้อมูล Level แบบ 2 คอลัมน์ (A, B)

```jsx
import LevelTableYAB from './components/LevelTableYAB';

<LevelTableYAB
    data={[{ a: '', b: '' }, { a: '', b: '' }]}
    onChange={(newData) => setData(newData)}
    rows={7}
/>
```

---

### 📈 Straightness Tables

#### `TableStraightness`
ตารางแสดงข้อมูล Straightness สำหรับ Y Axis

```jsx
import TableStraightness from './components/TableStraightness';

<TableStraightness
    data={{ top: [], side: [] }}
    onChange={(newData) => setData(newData)}
    standard={{ min: -2, max: 2 }}
    diffStandard={{ max: 2 }}
    rows={16}
    axisLabel="Y Axis."
    topLabel="Top"
    sideLabel="Side"
/>
```

#### `EDMTableStraightness`
ตาราง Straightness Check พร้อมกราฟสำหรับ EDM

```jsx
import EDMTableStraightness from './components/EDMTableStraightness';

<EDMTableStraightness
    title="Straight of X Axis"
    rowCount={31}
    strokeStep={20}
    data={{}}
    onChange={(newData) => setData(newData)}
    standard={3}
/>
```

---

### 🔄 Pitching Tables

#### `TablePitchingX`
ตารางแสดงข้อมูล Pitching X axis (B, T, DIFF)

```jsx
import TablePitchingX from './components/TablePitchingX';

<TablePitchingX
    data={{ b: [], t: [] }}
    onChange={(newData) => setData(newData)}
    standard={{ min: -20, max: 20 }}
    referenceCol={1}
/>
```

#### `TablePitchingY`
ตารางแสดงข้อมูล Pitching Y axis แบบแนวตั้ง (B, C, DIFF)

```jsx
import TablePitchingY from './components/TablePitchingY';

<TablePitchingY
    data={{ b: [], c: [] }}
    onChange={(newData) => setData(newData)}
    standard={{ min: -20, max: 20 }}
    referenceRow={1}
/>
```

---

### 🔄 Rolling Tables

#### `TableRollingX`
ตารางแสดงข้อมูล Rolling X axis

```jsx
import TableRollingX from './components/TableRollingX';

<TableRollingX
    data={{ b: [], t: [] }}
    onChange={(newData) => setData(newData)}
    standard={{ min: -20, max: 20 }}
    referenceCol={1}
/>
```

#### `TableRollingY`
ตารางแสดงข้อมูล Rolling Y axis แบบแนวตั้ง

```jsx
import TableRollingY from './components/TableRollingY';

<TableRollingY
    data={{ b: [], c: [] }}
    onChange={(newData) => setData(newData)}
    standard={{ min: -20, max: 20 }}
    referenceRow={1}
/>
```

---

### 📐 Pitch Check Tables

#### `TablePitchXYZUV`
ตารางรวม 4 TablePitchCheck (Y1, Y2, Y3, Y4) พร้อม MAX และ BACKLASH

```jsx
import TablePitchXYZUV from './components/TablePitchXYZUV';

<TablePitchXYZUV
    data={[
        { a: [], b: [] },
        { a: [], b: [] },
        { a: [], b: [] },
        { a: [], b: [] }
    ]}
    onChange={(newData) => setData(newData)}
    rowCount={16}
    stepSize={20}
    maxAB={15}
    maxDiff={1}
    showCalcCol={true}
    tableLabels={['Y1', 'Y2', 'Y3', 'Y4']}
/>
```

---

### 📊 Ento Tables

#### `TableEnto`
ตาราง Ento พื้นฐาน (A, B, Diff)

```jsx
import TableEnto from './components/TableEnto';

<TableEnto
    data={{ a: [], b: [] }}
    onChange={(newData) => setData(newData)}
    axisLabel="Z1L"
    rowCount={21}
    stepSize={20}
    maxValue={15}
    maxDiff={1}
/>
```

---

### 📈 XY Tables (P/R)

#### `TableXPR`
ตารางแสดงข้อมูล X axis (STD P, STD R, Act. P, Act. R)

```jsx
import TableXPR from './components/TableXPR';

<TableXPR
    data={{ p: [], r: [] }}
    onChange={(newData) => setData(newData)}
    standards={[]}
    cols={3}
    referenceCol={1}
/>
```

#### `TableYPR`
ตารางแสดงข้อมูล Y axis (P, R columns)

```jsx
import TableYPR from './components/TableYPR';

<TableYPR
    data={[{ p: '', r: '' }]}
    onChange={(newData) => setData(newData)}
    standards={[]}
    rows={3}
    referenceRow={1}
/>
```

---

### 📊 AB DIFF Tables

#### `TableXABDIFF`
ตารางแสดงข้อมูล Level แนวนอนพร้อม DIFF (STD, B, A=Kb, DIFF)

```jsx
import TableXABDIFF from './components/TableXABDIFF';

<TableXABDIFF
    data={{ b: [], a: [] }}
    onChange={(newData) => setData(newData)}
    standards={[]}
    cols={7}
/>
```

#### `TableYABDIFF`
ตารางแสดงข้อมูล Level แบบ 5 คอลัมน์ (No., STD., A=KB, B, DIFF)

```jsx
import TableYABDIFF from './components/TableYABDIFF';

<TableYABDIFF
    data={[{ a: '', b: '' }]}
    onChange={(newData) => setData(newData)}
    standards={[]}
    rows={7}
/>
```

---

### 📈 Yawing Graphs

#### `EDMYawingX`
กราฟ Yawing X แบบ 3 กราฟ (X-, Xc, X+) สำหรับ EDM

```jsx
import EDMYawingX from './components/EDMYawingX';

<EDMYawingX
    data={{ xMinus: '', xC: '', xPlus: '' }}
    onChange={(newData) => setData(newData)}
/>
```

#### `EDMYawingY`
กราฟ Yawing Y แบบ 3 กราฟ (Y+, Yc, Y-) สำหรับ EDM

```jsx
import EDMYawingY from './components/EDMYawingY';

<EDMYawingY
    data={{ yPlus: '', yC: '', yMinus: '' }}
    onChange={(newData) => setData(newData)}
/>
```

#### `EDWYawingX`
กราฟ Yawing X สำหรับ EDW (X+, Xc, X-)

```jsx
import EDWYawingX from './components/EDWYawingX';

<EDWYawingX
    data={{ xPlus: '', xC: '', xMinus: '' }}
    onChange={(newData) => setData(newData)}
/>
```

#### `YawingY`
กราฟ Yawing Y ทั่วไป

```jsx
import YawingY from './components/YawingY';

<YawingY
    data={{ yPlus: '', yC: '', yMinus: '' }}
    onChange={(newData) => setData(newData)}
/>
```

#### `YawingUV`
กราฟ Yawing สำหรับแกน U และ V

```jsx
import YawingUV from './components/YawingUV';

<YawingUV
    data={{ u: '', v: '' }}
    onChange={(newData) => setData(newData)}
    stdU={2}
    stdV={2}
/>
```

---

### 📊 Squareness Graph

#### `SQRgrapX`
กราฟ Squareness X Axis (L-shape graph)

```jsx
import SQRgrapX from './components/SQRgrapX';

<SQRgrapX
    value=""
    onChange={(newVal) => setValue(newVal)}
    topLabel="X"
    rightLabel="Y"
    inputLabel="X+ ="
    showTopSigns={false}
    showZeros={false}
/>
```

---

### ✅ Point Check Components

#### `ImagePointCheck`
แสดงภาพพร้อม Checkbox ตามตำแหน่งที่กำหนด

```jsx
import ImagePointCheck from './components/ImagePointCheck';

<ImagePointCheck
    backgroundImage="/path/to/image.png"
    width="100%"
    height="auto"
    aspectRatio="16/9"
    points={[
        { id: 'point1', x: 50, y: 30, label: 'Check 1', checked: false, textPosition: 'right' },
        { id: 'point2', x: 20, y: 60, label: 'Check 2', checked: true, textPosition: 'left' }
    ]}
    onChange={(pointId, checked) => handlePointChange(pointId, checked)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundImage` | string | `''` | URL ของภาพพื้นหลัง |
| `width` | string | `'100%'` | ความกว้าง |
| `height` | string | `'auto'` | ความสูง |
| `aspectRatio` | string | `null` | อัตราส่วน เช่น `'16/9'` |
| `points` | array | `[]` | ข้อมูลจุด checkbox `[{ id, x, y, label, checked, textPosition }]` |
| `onChange` | function | `() => {}` | callback `(pointId, checked)` |

---

### 🔧 Workstand Check

#### `WorkstandCheck`
ตรวจสอบ Workstand แบบ 4 ด้าน (A, B, C, D)

```jsx
import WorkstandCheck from './components/WorkstandCheck';

<WorkstandCheck
    data={{ a: [], b: [], c: [], d: [] }}
    onChange={(newData) => setData(newData)}
    maxDiff={8}
    maxCornerDiff={5}
    maxTotalDiff={8}
    maxAdjacentDiff={5}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | object | `{ a: [], b: [], c: [], d: [] }` | ค่าแต่ละด้าน |
| `onChange` | function | `() => {}` | callback เมื่อข้อมูลเปลี่ยน |
| `maxDiff` | number | `8` | ค่า diff max ที่ยอมรับ |
| `maxCornerDiff` | number | `5` | ค่า corner diff max |
| `maxTotalDiff` | number | `8` | ค่า total diff max |
| `maxAdjacentDiff` | number | `5` | ค่า adjacent diff max |

---

### 🔢 Pagination

#### `Pagination`
ปุ่มเลื่อนหน้าสำหรับดูฟอร์มหลายๆ หน้า

```jsx
import Pagination from './components/Pagination';

<Pagination
    currentPage={1}
    totalPages={10}
    onPageChange={(page) => setCurrentPage(page)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | number | `1` | หน้าปัจจุบัน |
| `totalPages` | number | `1` | จำนวนหน้าทั้งหมด |
| `onPageChange` | function | `() => {}` | callback เมื่อเปลี่ยนหน้า |

---

## 💡 Tips & Notes

- ทุก Component ใช้ **TailwindCSS** สำหรับ styling
- Input รองรับการกด **Enter** เพื่อ auto-focus ไปยังช่องถัดไป
- ค่าที่ไม่อยู่ในเกณฑ์มาตรฐานจะแสดง **พื้นหลังสีแดง**
- ทุก Component รองรับ **controlled mode** ผ่าน `data` และ `onChange` props
- รองรับการแสดงผลเป็น **ลูกศร** (←, →, ↑, ↓) แทนค่าบวก/ลบ

---

## 📄 License

MIT License

## 👤 Author

**Joe Kittiphong**
- GitHub: [@JoeKittiphong](https://github.com/JoeKittiphong)