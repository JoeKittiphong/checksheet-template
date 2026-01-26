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

ผลลัพธ์คือโค้ดในหน้า `Page1` ถึง `Page4` สะอาดขึ้นมาก และง่ายต่อการขยายผลไปยังหน้าอื่นๆ ในอนาคต
