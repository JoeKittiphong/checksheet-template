# ทักษะและกระบวนการทำงาน (Skills & Workflows)

ไฟล์นี้ใช้สำหรับบันทึกขั้นตอนมาตรฐาน (Best Practices) และกระบวนการทำงานต่างๆ ในโปรเจกต์ Checksheet เพื่อใช้เป็นคู่มืออ้างอิงในการทำงานครั้งต่อไป

---

## 1. การสร้างหน้าใหม่พร้อมรูปประกอบ (Creating a Page with Image)

- **ทำตามคำสั่งทีละหน้า**: ดำเนินการสร้างและจัดการเนื้อหาให้จบไปทีละหน้าตามที่ได้รับมอบหมาย ไม่ทำล่วงหน้าไปยังหน้าฐานข้อมูลอื่น เว้นแต่จะได้รับคำสั่งชัดเจน เพื่อป้องกันความสับสนของข้อมูล
- **หน้าต่อหน้า**: ข้อมูลของหน้าหนึ่งต้องไม่ล้นหรือเกินไปยังหน้าอื่น (One page per task)

### ขั้นตอนที่ 1: เตรียมไฟล์รูปภาพ
- นำรูปภาพไปวางไว้ที่ `src/assets/<Checksheet_Name>/image-X.png`

### ขั้นตอนที่ 2: สร้างไฟล์ Component หน้า (PageX.jsx)
- **DRY (Don't Repeat Yourself)**: หากพบว่ามี UI Pattern เดิมที่เคยเขียนไว้ในหน้าอื่น ให้พยายามดึงออกมาเป็น Component หรือใช้ Component ที่มีอยู่แล้วเสมอ
- **Check Existing Components**: ก่อนสร้าง Section หรือ Table ใหม่ ให้ตรวจสอบที่ `src/components/FormComponents` และ `src/components/UIcomponent` ว่ามี Component ที่วาง Pattern ไว้แล้วหรือไม่ เพื่อให้ UI ทั้งโปรเจกต์เป็นไปในทิศทางเดียวกัน
- **Verify Imports**: เมื่อสร้างหน้า Page ใหม่ ให้ตรวจสอบว่าได้ `import { content }` จากไฟล์ setting ประจำ Checksheet มาใช้ใน `<A4Paper />` เสมอ เพื่อป้องกันปัญหาหน้าจอขาว (White Screen)

### ขั้นตอนที่ 3: ลงทะเบียนหน้าใหม่
ไปที่ไฟล์หลักของ Checksheet (เช่น `FAWI0002_V3.jsx`) แล้วทำการ:
1. `import PageX from "./pages/PageX";`
2. เพิ่ม `<PageX />` ลงในรายการหน้า (Pages)

---

## 2. ระบบคำสั่งย่อ (Infinity Shortcuts)

ในการกรอกค่า Insulation Check ที่ต้องใช้เครื่องหมาย ∞ (Infinity):
- **Shortcut**: พิมพ์ `**` หรือ `***` ในช่อง Input
- **System**: ระบบจะแปลงเป็น `∞` ให้อัตโนมัติและรัน Validation ทันที
- **Validation**: ถ้า Standard ระบุว่าเป็น `∞` แต่กรอกตัวเลข ช่องนั้นจะกลายเป็นสีแดง (`bg-red-200`)

---

## 3. มาตรฐานการตั้งชื่อฟิลด์ (Naming Conventions)

เพื่อให้ข้อมูลจากทุกหน้าถูกรวบรวมไว้ใน State เดียวกันและไม่ทับซ้อนกัน ให้ใช้รูปแบบการตั้งชื่อดังนี้:

- **รูปแบบ**: `p[เลขหน้า]_[หมวดหมู่]_[ชื่อฟิลด์]`
- **ตัวอย่าง**:
  - `p14_ins_m11`: หน้า 14, หมวด Insulation Check, แถว Measured ที่ 11
  - `p14_ins_m21_check`: หน้า 14, หมวด Insulation Check, แถวที่ 21 ส่วน Checkbox
  - `p14_checked_by`: หน้า 14, ช่องลงชื่อผู้ตรวจสอบ
- **ความสำคัญ**: การใช้ `p[เลขหน้า]_` นำหน้าเสมอจะช่วยป้องกันบัค "กรอกหน้า 1 แล้วค่าโผล่หน้า 2" และทำให้ปุ่ม **SAVE ALL DATA** ทำงานได้อย่างถูกต้อง

---

## 4. การผูกข้อมูลกับ React Hook Form (RHF Binding)

หากต้องเริ่มงานชุด Checksheet ใหม่ที่มีจำนวนหน้ามากๆ ให้ใช้ Script อัตโนมัติ:
```bash
node create_checksheet.js <ชื่อChecksheet> <จำนวนหน้าทั้งหมด>
```
**ตัวอย่าง**: `node create_checksheet.js FAWI0003 58`
- ระบบจะสร้าง Folder, Meta, Config และไฟล์หน้า Page 1 จนถึง Page N ให้เองทั้งหมด

---

## 4. การจัดการ Logic กลาง (Centralized Logic)

- **Validation**: ให้ใช้ `validateValue` จาก `src/utils/validationUtils.js` เสมอ
- **Form Handlers**: Logic การพิมพ์หรือการเปลี่ยนสีภาพลักษณ์ (UI Class) ให้ดึงจาก `src/utils/formUtils.js` เช่น `getValidationClass` หรือ `handleInfinityShortcut`
---

## 5. การจัดการหน้าที่มีเนื้อหาหนาแน่น (UI Scaling for Dense Pages)

ในกรณีที่ต้องรวมเนื้อหาหลาย Section ไว้ในหน้า A4 เดียว (เช่น Page 24 ของ FAWI0002_V3):
- **Scaling**: ให้ครอบ Content ทั้งหมดด้วย `<div className="scale-95 origin-top">` (หรือระดับ 90-95 ตามความเหมาะสม)
- **Font Size**: ใช้ `text-xs` (12px) หรือ `text-[10px]` สำหรับรายละเอียดปลีกย่อย
- **Image Size**: กำหนดความสูงรูปภาพให้คงที่และใช้ `object-contain` (เช่น `h-32`, `h-40`) เพื่อป้องกันหน้าล้น (Page Overflow)

---

## 6. การจัดการไฟล์รูปภาพและการแก้ไข Build Error (Asset Management)

- **Case Sensitivity**: ในการ Build ด้วย Vite ให้ตรวจสอบว่านามสกุลไฟล์ตรงกัน 100% (โปรเจกต์นี้ใช้ **`.PNG` ตัวใหญ่** เป็นส่วนใหญ่)
- **Asset Verification**: ก่อนทำการ Import รูปภาพ ให้ตรวจสอบในโฟลเดอร์ `src/assets/<Checksheet_Name>` เสมอว่ามีไฟล์อยู่จริง
- **Build Troubleshooting**: หากสั่ง `npm run build` แล้ว Error เกี่ยวกับ "Could not load asset":
  1. ให้เช็คว่าไฟล์รูปนั้นมีอยู่จริงหรือไม่
  2. เช็คตัวสะกดและตัวเล็ก-ใหญ่ (Case) ในบรรทัดที่ Import
  3. หากไม่มีไฟล์จริง ให้ปรึกษาผู้ใช้หรือใช้รูปที่ใกล้เคียงเป็น Fallback ชั่วคราวเพื่อให้ Build ผ่าน
