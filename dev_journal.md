# บันทึกนักพัฒนา - Checksheet Template

## สรุปการพัฒนาล่าสุด

### 1. การจัดการ State ของฟอร์มและการบันทึกข้อมูล
- **Global State Integration**: ปรับแก้ทุกหน้า (หน้าปก - หน้า 23) ให้ใช้ `useFormContext` เพื่อให้ปุ่ม "SAVE ALL DATA" สามารถรวบรวมข้อมูลทั้งหมดได้ในครั้งเดียว
- **Standardized Naming**: ใช้มาตรฐานการตั้งชื่อแบบ `p[เลขหน้า]_[ชื่อฟิลด์]` (เช่น `p06_checkPoint`) เพื่อให้ ID ไม่ซ้ำกันใน State รวม
- **Performance & Safety**: สร้างและใช้งาน `useBufferedState` hook
  - **Buffering**: อัปเดตค่าใน State ย่อยก่อนแสดงผล เพื่อแก้ปัญหาพิมพ์หน่วง (Lag) ในฟอร์มขนาดใหญ่
  - **Persistence**: บันทึกข้อมูลร่าง (Draft) ลง `localStorage` อัตโนมัติ ป้องกันข้อมูลหายเมื่อกด Refresh หน้าจอ
  - **Sync**: ซิงค์ข้อมูลกลับไปยัง Form Context หลักเมื่อผู้ใช้พิมพ์เสร็จหรือเปลี่ยนหน้า

### 2. ระบบลงชื่อและการตรวจสอบผู้ใช้ (Signing Logic)
- **Smart Signature Components**: ปรับปรุง Component `CheckedBox` และ `SignBox`
  - **Click-to-Confirm**: เปลี่ยนจากการกดปุ่ม "Sign" แยก มาเป็นระบบ Popup ยืนยันตัวตนเมื่อคลิกที่ช่องชื่อ
  - **Auto-Fill**: เติมชื่อผู้ใช้ที่ Login อยู่และเวลาปัจจุบันโดยอัตโนมัติเมื่อกดยืนยัน
  - **Account Switching**: เพิ่ม Logic ตรวจสอบ ถ้าผู้เซ็นไม่ใช่ผู้ใช้ปัจจุบัน ระบบจะบันทึกงานและ Logout ให้โดยอัตโนมัติเพื่อให้ User ใหม่ Login เข้ามาเซ็น

### 3. การปรับปรุง Component และหน้า Checksheet
- **Page 4 & 6 Overhaul**:
  - นำ Component ใหม่ๆ มาใช้ เช่น `Checknumber`, `CheckedBox`, และ `LevelTableXAB`/`TableXABDIFF`
  - ตั้งค่า Props ต่างๆ ให้ยืดหยุ่น เช่น ป้ายชื่อ (`labelA`, `labelB`) และค่ามาตรฐาน (`StraightnessSTD`)
- **Graph Visualization**: ปรับ CSS ของ `EDMYawingY` จัดระยะห่างใหม่ เพื่อป้องกันไม่ให้เส้นกราฟแสดงผลทับซ้อนกับตัวเลขค่าที่แสดง

### 4. คุณภาพโค้ดและโครงสร้างพื้นฐาน (Code Quality & Infrastructure)
- **Validation Logic**: แยก Logic การตรวจสอบค่าต่างๆ ออกมาเป็นฟังก์ชันกลาง `validateValue` เพื่อลดการเขียนโค้ดซ้ำซ้อนและให้มาตรฐานเดียวกัน
- **Network Layer**: ปรับการเรียก API ทั้งหมดจาก `fetch` เป็น `axios` เพื่อการจัดการ Error ที่ดีขึ้น
- **Build & Deploy**: ตั้งค่า `vite.config.js` ให้ Build Output ไปยัง Path ที่ถูกต้อง และเตรียม Git Repository สำหรับ Version Control

### 5. เครื่องมือช่วยสร้าง Checksheet (Checksheet Generator Tool)
_2026-01-26_

เพื่อลดความซ้ำซ้อนและเวลาในการสร้าง Checksheet ใหม่ (ซึ่งต้องสร้าง Folder, Config files, และหน้า Page จำนวนมาก) จึงได้สร้าง Node.js script ขึ้นมาช่วยงานนี้

**เครื่องมือ**: `create_checksheet.js`

**การใช้งาน**:
คำสั่งเดียวสร้างครบทั้ง Folder Structure และไฟล์พื้นฐาน
```bash
node create_checksheet.js <ชื่อChecksheet> <จำนวนหน้า>
```

**ตัวอย่าง**:
```bash
node create_checksheet.js FAWI0002_V3 58
```

**สิ่งที่ระบบทำให้อัตโนมัติ**:
1.  **Generate Directory**: สร้าง Folder `src/checksheet/<Name>/pages`
2.  **Generate Meta**: อ่านชื่อไฟล์แล้วสร้าง `meta.json` (แยก Form Name กับ Version ให้เอง)
3.  **Generate Config**: สร้างไฟล์ `*-setting.js` พร้อมโครงสร้าง Config มาตรฐาน
4.  **Generate Main Component**: สร้างไฟล์ Checksheet component หลักที่ Import หน้าทั้งหมดมาให้แล้ว
5.  **Generate Pages**: สร้างไฟล์หน้าย่อยทั้งหมด (`Cover`, `Blank`, `Page1-N`) พร้อมใส่ Template มาตรฐาน

ช่วยลดการ Copy & Paste โค้ดเดิมๆ เวลาขึ้นงานใหม่ได้มาก

### 6. การจัดการตารางซับซ้อนด้วย FormQuickTable (โปรเจกต์ FAWI0002_V3)
_2026-01-26_

ปัญหาที่พบในโปรเจกต์ `FAWI0002_V3` คือตารางมีความซับซ้อนสูง มีการรวมเซลล์ (RowSpan) และต้องการการตรวจสอบค่า (Validation) ที่ยืดหยุ่น

**สิ่งที่พัฒนาเพิ่มเติม:**
- **FormQuickTable.jsx**: พัฒนา Component ใหม่ที่ใช้ข้อมูล (Data-Driven) ในการสร้างตาราง
  - **Auto RowSpan**: ระบบจะคำนวณการรวมเซลล์ให้โดยอัตโนมัติเมื่อข้อมูลในคอลัมน์ที่กำหนด (`rowGroup: true`) ซ้ำกัน
  - **Dynamic Input Support**: รองรับการเปลี่ยนประเภท Cell เป็น Input หรือ Checkbox ได้ทันทีผ่าน Config
- **FormValidatedCell.jsx**: แยก Component จาก Page 3 ออกมาเป็นตัวกลางสำหรับตาราง HTML ทั่วไปที่ต้องการระบบ Validation (พื้นสีแดง) ในตัว โดยสามารถระบุค่า `min` และ `max` ได้อิสระ
- **Input Validation Upgrade**: 
  - ปรับปรุงให้ `InputCheckSTD` รองรับการพิมพ์ค่าติดลบ `-` และป้องกันการพิมพ์เครื่องหมายซ้ำซ้อน
  - เพิ่มระบบแจ้งเตือนสีแดง (Validate) เข้าไปยัง `FormItemCheck` ทำให้หน้า Checksheet ทุกหน้ามีมาตรฐานความปลอดภัยข้อมูลเดียวกัน

### 7. ระบบแปลงค่าอัตโนมัติ (Auto-Replace Infinity)
_2026-01-27_

เพื่อแก้ปัญหาความยุ่งยากในการพิมพ์เครื่องหมาย Infinity (∞) ซึ่งต้องใช้การกดโค้ด Alt หรือการก๊อปปี้วาง จึงได้พัฒนาระบบตรวจจับการพิมพ์เพื่อแปลงค่าให้อัตโนมัติ

**สิ่งที่พัฒนา:**
- **Auto-Conversion Logic**: พัฒนาฟังก์ชัน `infinityReplacement` เข้าไปใน Component พื้นฐาน:
  - `FormQuickTable.jsx` (สำหรับตาราง)
  - `FormItemCheck.jsx` (สำหรับช่องเช็คทั่วไป)
  - `Checknumber.jsx` (สำหรับช่องกรอกตัวเลข)
- **Shortcut Trigger**: พนักงานสามารถพิมพ์ **`88`** หรือ **`**` (ดอกจัน 2 ตัว)** ระบบจะเปลี่ยนเป็น **`∞`** ให้ทันที
- **RHF Integration**: ใช้ `setValue` พร้อม flag `shouldValidate: true` เพื่อให้มั่นใจว่า UI จะอัปเดตทันทีและระบบ Validation ของ React Hook Form จะรับรู้ค่าใหม่นี้เสมือนเป็นการพิมพ์ปกติ

ช่วยลดความผิดพลาดและเพิ่มความสะดวกในการรัน Checksheet ในส่วนของ Insulation Check (หน้า 13) และหน้าอื่นๆ ที่เกี่ยวข้องอย่างมาก
### 8. งานพัฒนาเพิ่ม Page 14 ของชุด FAWI0002_V3
_2026-01-26_

ดำเนินการส่วนที่เหลือของ Section 15 (Insulation Check) ในหน้า 14 ต่อจากหน้า 13 โดยมีรายละเอียดดังนี้:
- [x] Implement Table in `Page 14`
    - [x] Implement Section 15: Insulation Check (Continuation Rows 11-23)
    - [x] Use `FormQuickTable` with RowSpan for "E" and "X1, X2, X3"
- [x] Verify functionality and visuals
- [x] Extract Form Logic to Utilities
    - [x] Create `formUtils.js`
    - [x] Update `FormItemCheck.jsx` to use utility logic
    - [x] Update `FormQuickTable.jsx` to use utility logic
metadata
    - [x] Verify validation- [x] Implement Page 16 (Voltage Check)
    - [x] Implement DISCHARGE CONTROLLER table with complex row spanning
    - [x] Handle Digital Meter No. header field
    - [x] Add signature box
    - [x] Verify RHF binding and validation
- [x] Verify visual consistency with the provided image

### 15. การปรับปรุงคอลัมน์ Sub-Condition ใน Page 16 & 17
_2026-01-27_

ปรับปรุงโครงสร้างตาราง Voltage Check ให้มีคอลัมน์รองรับค่า RG1, RG2 ตามที่ผู้ใช้ต้องการ:
- **Table Refactor**: เพิ่มคอลัมน์ `sub_condition` เข้าไประหว่าง Condition และ Measurement
- **Header Update**: ปรับหัวตาราง "Condition" ให้ครอบคลุมทั้ง 2 คอลัมน์ด้วย `colSpan: 2`
- **Logic Support**: เปิดใช้งาน `rowGroup: true` สำหรับคอลัมน์ใหม่นี้ เพื่อให้เซลล์ที่ไม่มีข้อมูลทำการ RowSpan รวมกัน ช่วยให้ตารางดูสะอาดและตรงตามต้นฉบับมากขึ้นครับ
    - [x] Verify validation in Page 13 & 14
    - [x] Implement custom render for rows 20-23 points with checkboxes
    - [x] Add signature box
- [x] Verify functionality and visuals
- **Verified Infinity Support**: ตรวจสอบความถูกต้องของระบบแปลงค่าและการตรวจสอบในทุกจุดที่เกี่ยวข้องเพื่อให้ทำงานได้สมบูรณ์

### 10. การจัดทำบันทึกทักษะ (Skills Documentation)
_2026-01-27_

เพื่อความต่อเนื่องในการพัฒนาและความสะดวกในการส่งต่องาน ได้จัดทำไฟล์ `skills.md` ไว้ที่ Root directory:
- **Purpose**: บันทึกขั้นตอนการทำงานที่เป็นมาตรฐาน (Workflows) เช่น การสร้างหน้าใหม่พร้อมรูปภาพ, การใช้ Script สร้างโปรเจกต์ และการใช้ตัวย่อ Infinity
- **Naming Standard**: กำหนดมาตรฐานการตั้งชื่อฟิลด์ `pXX_...` เพื่อให้การรวมข้อมูล (RHF State) เป็นไปอย่างถูกต้องและไม่ซ้ำซ้อน
- **Manual**: รวมตัวอย่างโค้ดและคำอธิบายจุดสำคัญต่างๆ เพื่อให้คนในทีม (หรือ AI) สามารถทำงานตามมาตรฐานเดียวกันได้อย่างรวดเร็ว

### 11. การจัดทำ Page 15 (MS Controller Insulation Check)
_2026-01-27_

ดำเนินการสร้างหน้า 15 ต่อเนื่องจากระบบ Insulation Check:
- **Table Structure**: ใช้ `FormQuickTable` สร้างตาราง MS CONTROLLER 15 แถว
- **Complex RowSpan**: จัดการการรวมเซลล์ (RowSpan) สำหรับคอลัมน์ Measurement(+), Measurement(-) และ Point ที่มีความซับซ้อน (เช่น ข้อมูล E-TB1 รวมกัน 6 แถว)
- **Dual Standards**: สำหรับแถวที่ 9, 10, 14, 15 ที่มีมาตรฐาน 2 แบบใน No. เดียวกัน ได้ทำการแยกเป็น 2 แถวข้อมูลย่อยเพื่อให้สามารถกรอกค่าแยกกันได้อิสระและรัน Validation ได้ถูกต้อง
- **RHF Binding**: ตั้งชื่อตัวแปร `p15_ins_m1` ถึง `p15_ins_m15_2` เพื่อความเป็นระเบียบและไม่ซ้ำซ้อน

### 12. การจัดทำ Page 16 (Voltage Check)
_2026-01-27_

ดำเนินการสร้างหน้า 16 สำหรับการตรวจสอบแรงดันไฟฟ้า (Voltage Check):
- **Table Structure**: ใช้ `FormQuickTable` สร้างตาราง DISCHARGE CONTROLLER 19 แถว
- **Complex Grouping**: จัดการคอลัมน์ Condition (Main Breaker On, Source On, Power On) และคอลัมน์ย่อย (RG1, RG2, ฯลฯ) ให้แสดงผลแบบ RowSpan ที่สวยงามตามต้นฉบับ
- **Input Header**: เพิ่มช่องกรอก "DIGITAL METER NO." ที่หัวตาราง โดยผูกกับตัวแปร `p16_meter_no`
- **Validation**: ตั้งค่า `measured_min/max` ให้ครอบคลุมทั้งช่วง AC (195-215V) และ DC (เช่น 24.15-24.20V) เพื่อระบบ Validation แจ้งเตือนเมื่อกรอกค่าผิดพลาด
- **RHF Binding**: ผูกข้อมูลทุกช่องรวมถึงช่องลงชื่อ (`p16_checked_by`) เรียบร้อยแล้ว
### 14. การจัดทำ Page 17 (MS Controller Voltage Check & Switch Check)
_2026-01-27_

ดำเนินการสร้างหน้า 17 สำหรับการตรวจสอบแรงดันไฟฟ้าของ MS Controller และการตรวจสอบสวิตช์:
- **Voltage Table**: ใช้ `FormQuickTable` สร้างตาราง MS CONTROLLER 25 แถว
- **Complex RowSpan**: จัดการ Condition "Source On" และ "Power On" และการรวมกลุ่ม Unit (TB-1, TB-2, GPDA-02, ฯลฯ)
- **Validation**: ตั้งค่ามาตรฐานแรงดันไฟฟ้าทั้ง AC และ DC พร้อมย่านการตรวจสอบที่ถูกต้อง
- **Section 16.1**: เพิ่มส่วนการตรวจสอบ Remote Control Box และ Mouse โดยใช้ `FormItemCheck` สำหรับ Checkbox ทั้ง 4 ข้อ
- **Signature & RHF**: ผูกข้อมูลกับ `p17_...` และเพิ่มช่องลงชื่อท้ายหน้า
### 16. การควบรวมหน้า Page 24 (ชุด FAWI0002_V3)
_2026-01-27_

ดำเนินการควบรวมเนื้อหา 3 ส่วน (Sections 23, 24, 25) มาไว้ในหน้าเดียวตามความต้องการของผู้ใช้:
- **Consolidation**: รวม "Process Tank Door Check", "Adjust Float Sensor Position" และ "Float Sensor Check" ไว้ที่ Page 24 และทำให้ Page 25 เป็นหน้าว่าง
- **UI Optimization**: ใช้เทคนิคการทำ Scaling (`scale-95`) และลดขนาดตัวอักษร/รูปภาพ เพื่อให้เนื้อหาทั้ง 3 ส่วนที่เดิมต้องใช้ 2 หน้า สามารถบรรจุลงในหน้า A4 เดียวได้อย่างครบถ้วนและอ่านง่าย
- **Asset Alignment**: ปรับแก้การ Import รูปภาพประกอบให้ตรงกับ Section ที่ย้ายมา

### 17. การแก้ไข Build Error และการจัดการ Asset (ชุด FAMB0004_V3)
_2026-01-27_

แก้ไขปัญหา `build-all.cjs` ล้มเหลวเนื่องจากหาไฟล์รูปภาพประกอบไม่พบ (ENOENT):
- **Deep Debugging**: ตรวจพบไฟล์ `image-28.png` หายไปและมีการใช้ชื่อนามสกุลไฟล์พิมพ์เล็ก/ใหญ่ไม่ตรงกันระหว่างโค้ดกับไฟล์จริง (Case-sensitivity)
- **Asset Fallback Strategy**: สำหรับหน้าที่รูปภาพหายไปอย่างถาวร (จากการ Generate Script) ได้ทำการเลือกรูปที่ใกล้เคียงที่สุดมาเป็น Fallback เพื่อให้ระบบสามารถ Build ต่อได้
- **Normalization**: ปรับแก้การ Import รูปภาพทั้งหมดให้เป็นนามสกุล `.PNG` (ตัวใหญ่) ตามมาตรฐานของไฟล์ที่เก็บไว้ในเครื่อง เพื่อลดความสับสนในการทำงานครั้งต่อไป

### 18. การตรวจสอบข้อมูลระดับโกลบอลและการบังคับลงนาม (Global Validation & Signature Enforcement)
_2026-01-29_

เพื่อความสมบูรณ์ของข้อมูลก่อนการส่งมอบ ได้ทำการ Audit และปรับปรุงระบบ Validation ทั่วทั้งแอปพลิเคชัน:
- **Required by Default**: ปรับปรุงทุก Input Component (`TristateCheckbox`, `InputCheckSTD`, `FormQuickTable`) ให้มีสถานะ **"จำเป็นต้องกรอก"** เป็นค่าเริ่มต้น หากต้องการให้เป็น Optional ต้องระบุ `required={false}` เท่านั้น
- **Signature Blocking**: แก้ไขปัญหา `SignBox` และ `InfoInputForm` ที่เดิมแสดงแค่ขอบแดงแต่ยังกด Verify ผ่านได้ โดยการใช้ `useEffect` เพื่อทำ `register({ required: true })` เข้ากับ React Hook Form ทำให้ไม่สามารถกด "Verify" ผ่านได้ถ้ายังไม่ได้ลงชื่อหรือกรอกข้อมูลเครื่องจักร
- **Visual Standardization**: ปรับสไตล์การแจ้งเตือน Error ให้เหลือเพียง **ขอบแดง (Red Border)** และนำสีพื้นหลังสีแดงออก เพื่อความสะอาดตาและเป็นไปตามมาตรฐานเดียวกันทุกจุด

### 19. การแก้ไขปัญหาเด้งกลับหน้าหลัก (PWA Redirect Loop Fix)
_2026-01-29_

ตรวจพบปัญหาการ Redirect วนลูปเมื่อเปิด Checksheet จาก Admin Panel ซึ่งมีสาเหตุมาจากระบบ Cache ของ PWA:
- **Root Cause**: PWA ทำการ Precache ไฟล์ `index.html` ไว้ ทำให้ Browser โหลดหน้าเว็บจากเครื่องแทนที่จะถาม Server ส่งผลให้ข้ามขั้นตอนการเช็ค Token ของ Server ไป แต่เมื่อแอปเริ่มทำงาน JavaScript กลับพบว่า Session หมดอายุจึงสั่ง Redirect กลับหน้าหลัก
- **NetworkFirst Strategy**: ปรับโครงสร้าง `vite.config.js` ให้ใช้กลยุทธ์ `NetworkFirst` สำหรับคำขอประเภท Navigation (การเปิดหน้าเว็บ) เพื่อให้พยายามติดต่อ Server เพื่อเช็คสิทธิ์ก่อนเสมอ
- **Resilient Auth Check**: ปรับปรุง `ChecksheetMaster.jsx` ให้ฉลาดขึ้น โดยจะสั่ง Redirect เฉพาะเมื่อได้รับ Error 401 หรือ 403 จาก Server เท่านั้น เพื่อป้องกันการเด้งกลับเมื่อเกิดปัญหา Network ทั่วไป
