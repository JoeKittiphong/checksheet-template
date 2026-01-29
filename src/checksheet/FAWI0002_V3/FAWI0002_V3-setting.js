export const meta = {
    form_name: "FAWI0002",
    version: "V3",
    title: "FINAL TEST CUTTING 1",
    department: "EDW",
    model: "AL400G(iG+E)",
    as_group: "FINAL",
    checksheet_name: "FAWI0002_V3"
}
export const cover = {
    docNumber: "FAWI0002",
    version: "3.0",
    dateOfIssue: "1/11/2023",
    approvalDate: "*",
    issuedBy: "ENGINEERING DIV.",
    title: "CHECK SHEET TEST CUT 1 AL400G (iG+E)",
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form No.FQAG0017 19/Nov./'96",
    documentNo: 'FAWI0002',
    releaseNo: '3',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 58,
    date: "1 Nov 2023",
    model: 'AL400G(iG+E)',
    group: 'FINAL INSPECTION'
}

export const checkpoint = {
    c1: "Magnet Z\n-ไม่เป็นรอยขีดข่วน\n- สกรูล็อคแน่นทุกตัว\n- ทาน้ำมันสนบริเวณรอบๆ  ",
    c2: "Head \n- ทาน้ำมันสน",
    c3: "Bellows Z \n- ประกอบถูกต้อง\n ไม่กลับด้าน",
    c4: "Quill Plate\n- ใช้สกรู CS (BLK) M8x40\nกับ special washer 4 ชุด ใน\nการล็อค \n- ใช้ค่า torque = 200 kgf. \nและ มาร์คสีเหลืองทุกครั ้ง",
    c5: "Ceramic Base \n- ไม่เป็นรอยขีดข่วนบนผิว\nและขอบด้านข้าง \n- สกรูล็อคแน่นทุกตัว ",
    c6: "Slide Tank A \n- ไม่มีเศษผ้า,เศษเหล็ก,ใบ Plan \nหรือเครื่องมือตกค้างอยู ่ข้างใน ",
    c7: "Magnet Y \n- ไม่เป็นรอยขีดข่วน \n- สกรูล็อคแน่นทุกตัว \n- ทาน ้ามันสนบริเวณรอบๆ ",
    c8: "Bed  \n- ไม่มีเศษผ้า,เศษเหล็ก,ใบ Plan\nหรือเครื่องมือตกค้างอยู ่ข้างใน \n- ทาน ้ามันสน ",
    c9: "LM-Guide\n- สกรูล็อคแน่นทุกตัว \n- ทาน ้ามันสนบริเวณรอบๆ",
    c10: "Saddle\n- ไม่มีเศษผ้า,เศษเหล็ก,ใบ Plan \nหรือเครื่องมือตกค้างอยู ่ข้างใน\n- ทาน ้ามันสน \n-สกรูล็อคแน่นทุกตัว ",
    c11: "Magnet X \n- ไม่เป็นรอยขีดข่วน \n- สกรูล็อคแน่นทุกตัว \n- ทาน ้ามันสนบริเวณรอบๆ ",
    c12: "Arm-X \n- ไม่มีเศษผ้า,เศษเหล็ก,ใบ Plan\nหรือเครื่องมือตกค้างอยู ่ข้างใน\n- ทาน ้ามันสน ",
    c13: "Linear Coil \n- สกรูล็อคแน่นทุกตัว ",
}

export const imagePath = `${import.meta.env.BASE_URL}images/FAWI0002_V3/`
// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;

