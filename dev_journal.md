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

### 20. การแสดงสถานะหน้าและซิงค์ข้อมูล (Pagination Status & GitHub Sync)
_2026-01-29_

ดำเนินการปรับปรุง UX ครั้งใหญ่เพื่อให้ผู้ใช้ทราบสถานะของเอกสารได้ทันทีก่อนบันทึกและนำโค้ดขึ้นระบบ Cloud:

- **Pagination Status Visualization**:
  - เปลี่ยนปุ่ม Pagination ให้สื่อความหมายด้วยสี
  - **🟢 สีเขียว (Success)**: เมื่อหน้ากกรอกข้อมูลครบถ้วนสมบูรณ์
  - **🔴 สีแดง (Error)**: เมื่อมีช่องว่างหรือค่าผิดปกติในหน้านั้น
- **Page Offset Logic**: 
  - ปรับปรุงการนับหน้าเนื่องจากเอกสารจริงมีหน้าปก (Cover) และหน้าว่าง (Blank) นำหน้า
  - Implement Logic ให้แสดงผลหน้า 1-2 เป็น "C" และ "B" และเริ่มนับหน้า 1 จริงที่ Physical Page 3
- **Validation Enforcement**: audit component ทุกตัว (WorkstandCheck, CeramicCheck, etc.) ให้มั่นใจว่าไม่มีช่องไหนหลุดรอดการตรวจสอบ (100% Completion Rule)
- **GitHub Sync**:
  - Push Code ทั้ง **Frontend** และ **Backend** ขึ้น GitHub Repository เรียบร้อยแล้ว
  - แยก Repo ชัดเจนระหว่าง `checksheet-template` และ `checksheet-template-server`

### 21. ระบบ Workflow สถานะ, การตรวจสอบสิทธิ์ และการจัดการไฟล์ PDF
_2026-01-30_

ปรับปรุงการทำงานหลักของระบบให้รองรับ Flow การทำงานจริง และจำกัดสิทธิ์ผู้ใช้ให้ถูกต้อง:

- **Status Workflow Enforcement**:
  - Implement Logic **100% Completion Rule** ใน `ProfileBar.jsx`: บังคับว่าต้องกรอกครบทุกช่อง (ผ่าน Validation ทั้งหมด) เท่านั้นถึงจะสามารถเปลี่ยนสถานะเป็น **Finish** ได้
  - ใช้ `methods.trigger()` เพื่อสั่ง Validate ทั้งฟอร์มก่อน Submit

- **Permissions & Security**:
  - **Cover Page Restriction**: จำกัดสิทธิ์หน้าปกใหม่ โดยผู้ใช้ระดับ **Worker** จะแก้ไขได้เฉพาะวันที่ (Start/Finish), Option และลงชื่อ "Checked By" เท่านั้น ส่วน "Machine No", "Controller No" และ "Approved By" จะถูกล็อกแก้ยากและแจ้งเตือนถ้าพยายามเซ็น
  - **Admin View Filtering**: ปรับหน้า Admin Panel ให้ผู้ใช้ระดับ Worker เห็นเฉพาะงานที่มีสถานะ `work_in_progress` เท่านั้น เพื่อไม่ให้สับสนกับงานเก่าหรือ Template

- **PDF Automation**:
  - ปรับ Format การตั้งชื่อไฟล์ PDF ใหม่เป็น `Form-Version-Model-Title-MachineNo.pdf` โดยดึงค่า Model มาแทรกให้อัตโนมัติตามความต้องการ

- **Bug Fixes**:
  - แก้บั๊ก `InfoInputForm` เด้ง (Crash) โดยเพิ่ม `KeypadProvider` ใน `main.jsx`
  - แก้บั๊ก CSS ของช่องวันที่ (`input type="date"`) ให้ตัวหนังสืออยู่กึ่งกลางจริงๆ ด้วย `webkit-datetime-edit` selector

### 22. การปรับปรุงระบบอัพโหลดรูปภาพและการเลือก Model (Image Upload & Multi-Model Selection)
_2026-02-02_

ปรับปรุงประสบการณ์ผู้ใช้ในการอัพโหลดรูปภาพและเพิ่มความยืดหยุ่นในการเลือก Model สำหรับ Checksheet:

- **Client-Side Image Compression**:
  - Implement `resizeImage()` function ใน `CompactImageUpload.jsx`
  - ใช้ Canvas API ย่อภาพก่อนอัพโหลด (max 1200px, JPEG 85%)
  - แก้ไข Bug `Image` constructor conflict โดยใช้ `window.Image()`

- **Server-Side Image Deletion**:
  - เพิ่ม `DELETE /api/upload/delete` endpoint ใน `upload.js`
  - รองรับการลบไฟล์จาก `double_check` และ `assy_problem_images` folders
  - เพิ่ม Security: folder validation และ filename sanitization

- **OPTIONS Input Consolidation**:
  - เปลี่ยน `InfoInputForm.jsx` จาก 5 input fields เป็น 1 textarea
  - ให้ผู้ใช้กรอก Options ได้อิสระมากขึ้น

- **Multi-Model Selection (Radio Buttons)**:
  - เมื่อ Model มี `&` (เช่น `ALN400G&ALN600G`) แสดงเป็น Radio buttons ให้เลือก
  - Logic ใน `InfoInputForm.jsx` ตรวจจับและ split model string อัตโนมัติ

- **Admin Panel - available_models Support**:
  - เพิ่ม `available_models` array ใน `meta.json` สำหรับ forms ที่รองรับหลาย models
  - แก้ไข `formRoutes.js` ให้ส่ง `available_models` ใน API response
  - ปรับ `AddModal.jsx` ให้ใช้ case-insensitive matching และ flexible model comparison
  - แก้ไข Bug dropdown value matching ให้ match เฉพาะ `name` (ไม่ต้อง match `machine_no`)

**ไฟล์ที่แก้ไข**:
- `CompactImageUpload.jsx` - resize + delete integration
- `InfoInputForm.jsx` - textarea + model radio
- `upload.js` - DELETE endpoint
- `formRoutes.js` - available_models in response
- `AddModal.jsx` - flexible model matching
- `meta.json` (FAWI0006_V3) - available_models array

### 23. การเพิ่มแบบฟอร์มใหม่และการปรับปรุง Page 77, 87 (FAWI0006 Refactor)
_2026-02-03_

- **New Forms**: เพิ่มแบบฟอร์มใหม่ตามความต้องการของผู้ใช้งาน
- **Bug Fixes**:
  - แก้ไขปัญหา Page 77 ที่มีการ Duplication (ซ้ำซ้อน)
  - แก้ไข Page 87 JSX Error ที่ทำให้หน้าเว็บโหลดไม่ได้
- **Performance Optimization**: 
  - ปรับปรุง `ChecksheetMaster` ให้โหลดเร็วขึ้น
  - ปรับปรุง Logic ของ Pagination ให้แสดงผลถูกต้องและตอบสนองไวขึ้น

### 24. ปรับปรุงระบบแจ้งปัญหา (Problem Direct Enhancement)
_2026-02-05_

พัฒนาฟีเจอร์สำหรับการแจ้งปัญหา (Problem Report) ให้ใช้งานสะดวกยิ่งขึ้น:
- **Create Modal**: เพิ่ม Modal สำหรับสร้างรายการปัญหาโดยไม่ต้องเปลี่ยนหน้า ทำให้ Workflow ต่อเนื่องไม่สะดุด
- **Server Integration**: เชื่อมต่อ API เพื่อรองรับการลบรายการปัญหา (Delete Action) ออกจาก Server ได้โดยตรง
- **Print Overlay**: เพิ่ม Overlay สำหรับการสั่งพิมพ์หน้ารายงานปัญหา เพื่อให้ได้รูปแบบเอกสารที่สวยงามเมื่อพิมพ์ออกทางเครื่องพิมพ์

### 25. การจัดทำ Page 120-121 (Additional Pages)
_2026-02-11_

- ดำเนินการสร้างหน้า 120 และ 121 เพิ่มเติมตามเอกสารอ้างอิง
- ตรวจสอบความถูกต้องของ Input fields และการแสดงผล

### 26. การจัดทำ Page 130-138 และ Reference Page (FAWI0005_V3 Completion)
_2026-02-12_

ดำเนินการสร้างหน้าสุดท้ายของชุด FAWI0005_V3 จนครบสมบูรณ์:
- **New Pages**: สร้างหน้า 130 ถึง 138 ครบถ้วน
- **Specific Implementations**:
  - **Page 136**: ปรับแต่งการแสดงผล `EDWFinalRoughnessCheck` และ `EDWFinalSizeRecord` โดยใช้ Tailwind CSS Arbitrary Selectors (`[&_tbody_tr:nth-child(1)]:hidden`) เพื่อซ่อนแถวที่ไม่ต้องการ (Up/Low) โดยไม่ต้องแก้ไข Component กลาง รักษากฎการ Reusable ของระบบ
  - **Page 137**: สร้าง Form ตรวจสอบ ECO System และ Nozzle Check พร้อมรูปประกอบ
  - **Page 138**: สร้างหน้า Reference "Gathering Settings" โดยใช้ Monospace font เพื่อแสดง Code Parameter ที่ซับซ้อนให้อ่านง่าย
- **Assets Management**: เพิ่มและจัดการรูปภาพประกอบใหม่ๆ (Diagrams, Nozzle images, Jig images) ลงในโฟลเดอร์ `assets/FAWI0005_V3/`
- **System Update**: 
  - อัปเดต `FAWI0005_V3.jsx` ให้รองรับ Range หน้าทั้งหมด (1-138)
  - อัปเดต `meta.json` และ `*-setting.js` ให้ข้อมูลเป็นปัจจุบัน

### 27. ปรับปรุง Page 5 และ CreateProblemModal (Refactor & Validation)
_2026-02-13_

ดำเนินการปรับปรุงคุณภาพโค้ดและเพิ่มฟีเจอร์ตรวจสอบความถูกต้องของข้อมูลตามความต้องการของผู้ใช้:

- **Refactoring Page 5**:
  - ตัด `DynamicTableSelector.jsx` ออกและย้าย Logic การเลือกตาราง (AL400G vs AL600G) กลับเข้ามาไว้ใน `Page5.jsx` โดยตรง เพื่อลดความซับซ้อนของโครงสร้างไฟล์และทำให้อ่านโค้ดง่ายขึ้น

- **Voltage Validation (+/- 1V)**:
  - เพิ่ม Logic ตรวจสอบค่า Min/Max ให้กับตารางตรวจสอบแรงดันไฟฟ้าทั้ง 3 ตารางใน Page 5
  - กำหนดให้แจ้งเตือน (ตัวแดง) หากค่าที่วัดได้อยู่นอกช่วง **Standard Value +/- 1V**

- **CreateProblemModal Data Source**:
  - ปรับปรุง `ProblemDirect.jsx` ให้ดึงค่าเริ่มต้น (Default Values) สำหรับ Modal แจ้งปัญหาจาก React Hook Form (`getValues`) เป็นหลักแทนการใช้ Metadata
  - **Solved Issue**: แก้ปัญหาการดึงชื่อ Model ผิดพลาดในกรณีที่ Metadata เก็บชื่อรวม (เช่น "Model A & B") แต่ในฟอร์มผู้ใช้เลือก "Model A" -> ระบบจะดึง "Model A" ไปใช้อย่างถูกต้อง
  - รองรับการดึง `machine_no` จากหลายชื่อตัวแปร (`machineNo`, `mc_no`, `mc_no_input`)

- **Fix ASSY_PROBLEM Image Path**:
  - แก้ไข `ImageUploadBox.jsx` ให้ดึงภาพจากโฟลเดอร์ `uploads/assy_problem_images` (จากเดิมที่ผิดเป็น `uploads/assy_problem`) ทำให้ภาพที่บันทึกแล้วกลับมาแสดงผลได้ถูกต้อง
  - เพิ่ม Route ใหม่ใน Server (`as_server.js`) ให้รองรับ Path `uploads/assy_problem_images` และปลดล็อก Authentication สำหรับ Route นี้เพื่อแก้ปัญหารูปไม่ขึ้น

- **Implement Image Deletion on Save**:
  - ปรับปรุง Logic การอัปโหลดรูปภาพ (`apiUtils.js`, `ChecksheetMaster.jsx`)
  - เมื่อผู้ใช้เปลี่ยนรูปภาพใหม่และกด **บันทึก (Save)** ระบบจะทำการ:
    1. อัปโหลดรูปใหม่ขึ้น Server
    2. ตรวจสอบว่ามีรูปเก่าอยู่หรือไม่
    3. หากมีรูปเก่า จะทำการ **ลบรูปเก่าทิ้งทันที** เพื่อไม่ให้เปลืองพื้นที่ Server
  - การทำงานนี้จะเกิดขึ้นเฉพาะตอนกด Save เท่านั้น (ถ้าเปลี่ยนรูปแต่ไม่ Save รูปเก่าจะไม่หาย)

- **Remove "+ ASSY PROBLEM" Button**:
  - ปรับปรุง `A4Paper.jsx` ให้รับ Prop `showProblemButton` (Default = true)
  - กำหนดค่า `showProblemButton={false}` ในหน้า `ASSY_PROBLEM` เพื่อซ่อนปุ่มแจ้งปัญหา (เพราะอยู่ในหน้าแจ้งปัญหาอยู่แล้ว) ไม่ให้แสดงซ้ำซ้อน

- **Pre-fill ASSY_PROBLEM Data**:
  - แก้ไข `ProblemDirect.jsx` ให้ส่งข้อมูลเริ่มต้น (`checksheet_data`) ไปยัง Server ตอนสร้างใบปัญหางานใหม่
  - **การ Mapping ข้อมูล (Fix):**
    - `model` -> `mc_model` & `model` & **`mc_model_input`** (สำคัญ! ต้องมี input ไม่งั้น text ไม่ขึ้น)
    - `machine_no` -> `mc_no` & `machine_no` & **`mc_no_input`** (สำคัญ!)
    - `as_group` -> ติ๊ก Checkbox ตามเงื่อนไข:
        - `FINAL`, `INSPECTION` -> `div_insp` (Inspection)
        - `SEMI` -> `div_semi`
        - `BODY` -> `div_body`
        - `MC_CHECK` -> `div_mc`
        - `ACCURACY` -> `div_acc`
### 28. การปรับโครงสร้างหน้าและปรับแต่งตาราง (FAMB0008_V1 Reordering & Customization)
_2026-02-14_

ดำเนินการปรับโครงสร้าง Checksheet และปรับแต่ง Component ตามความต้องการของผู้ใช้:

- **Page Reordering (Structure Update)**:
  - **Delete Pages**: ลบหน้า 10, 11, 12 ออกจากระบบ
  - **Shift Pages**: เลื่อนหน้า 13-22 ขึ้นมาแทนที่ เป็นหน้า 10-19
  - **Restoration**: กู้คืนหน้า 10-12 (เนื้อหาเดิมของหน้า 13-15 จาก Template) ที่ถูกลบไปโดยไม่ตั้งใจระหว่างการย้าย

- **FormEDMTableStraightness Customization**:
  - ปรับปรุง Component ตาราง Straightness เพื่อรองรับข้อมูลจำนวนมาก (61 Rows) ในหน้าเดียว
  - **New Props**:
    - `fontSize`: ปรับขนาดตัวอักษรได้ (ใช้ `text-[10px]`)
    - `width`: กำหนดความกว้างตารางได้ (ใช้ `300px`)
    - `colWidths`: กำหนดความกว้างคอลัมน์ย่อยได้ (`['w-6', 'w-8', 'w-10']`)
    - `rowHeight`: กำหนดความสูงแถวได้ (ใช้ `12px`)
  - **UI Cleanup**:
    - ลบ Header Row ที่ไม่จำเป็นออก (Height = 0)
    - ลด Padding ของ Title Bar (`py-0`) เพื่อประหยัดพื้นที่แนวตั้ง

- **Implementation Result**:
  - หน้า 10 (Straightness Top) สามารถแสดงผลข้อมูล 61 จุดวัดได้ครบถ้วนในหน้าเดียว โดยตารางมีความกระชับ อ่านง่าย และกราฟแสดงผลได้ถูกต้องไม่ผิดเพี้ยน
### 29. การจัดทำ FAMB0007_V3 Page 3 และ Reusable Component
_2026-02-16_

ดำเนินการสร้างหน้า 3 ของชุด FAMB0007_V3 และพัฒนา Component ส่วนกลางใหม่:
- **FormHorizontalTableSingleRow**: พัฒนา Component ตารางแนวนอนแถวเดียวขึ้นใหม่เพื่อใช้กับ Straightness Check
  - **Single Row Layout**: ออกแบบให้รองรับการกรอกข้อมูล 0-6 จุดวัดในแถวเดียว พร้อม Label กำกับ (Z, W Axis)
  - **Dynamic Features**: เพิ่ม Prop `showArrows` สำหรับเปิด/ปิดการแสดงผลลูกศร และ `validateStd` สำหรับการเช็คค่ามาตรฐานรายช่อง
  - **Auto Diff Calculation**: มีระบบคำนวณค่า Max-Min ภายในเพื่อใช้ตรวจสอบความถูกต้องของข้อมูล
- **Page 3 Implementation**:
  - **Section 7 & 9**: ใช้ `FormHorizontalTableSingleRow` สำหรับการตรวจสอบความตรง (Straightness) ของแกน Z และ W ทั้งด้านหน้าและด้านข้าง
  - **Section 8 & 10**: ติดตั้งระบบตรวจสอบขนานของ Ball Screw (Parallel Check) พร้อมรูปภาพประกอบและ Validation 5 µm
  - **Machine Running Test**: เพิ่มระบบบันทึกเวลา Run Test 2 ชั่วโมงพร้อมระบบตรวจสอบระยะข้าม (Minimum duration check)
  - **Signature Box**: วางตำแหน่งช่องเซ็นชื่อแบบ Absolute ไว้ที่ท้ายหน้าเพื่อความเป็นระเบียบ

### 30. การจัดทำ FAMB0007_V3 Page 7 (Item 18 Ento Check)
_2026-02-17_

ดำเนินการสร้างหน้า 7 และพัฒนา Component ใหม่สำหรับตรวจสอบ Ento Data Check:
- **New Component**: `FormTableEntoSingleDir` (และ `EntoTableSingleDir`)
  - **Single Direction Logic**: ออกแบบมาสำหรับการตรวจสอบค่า "ขาเดียว" (Up leg only) โดยตัด Logic การสลับทิศทาง (Snake) ของ EntoTable เดิมออก
  - **Custom Headers**: รองรับการกำหนด Header ด้านบนแบบกำหนดเองผ่าน prop `topHeader` (เช่น `[X-Axis = 150 mm]...`)
  - **Simplified Structure**: ตัดคอลัมน์ Diff ออกเหลือเพียงคอลัมน์ข้อมูล (Z1, Z2) และย้ายการคำนวณสรุปไปไว้ที่ Input ด้านล่างแทน
- **Page 7 Implementation**:
  - **Item 17**: ใช้ `FormEDMTableStraightness` สำหรับตรวจสอบความตรง (Top View)
  - **Item 18**: ใช้ `FormTableEntoSingleDir` สร้างตารางตรวจสอบ Ento แบบ Side/Front View พร้อมช่องกรอก Data/SD แยกต่างหาก
