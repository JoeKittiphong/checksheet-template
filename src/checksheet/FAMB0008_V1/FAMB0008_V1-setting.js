export const meta = {
    form_name: "FAMB0008",
    version: "V1",
    title: "CHECK SHEET BODY ASS'Y AL100G PLUS",
    department: "EDM",
    model: "AL100G PLUS",
    as_group: "BODY",
    checksheet_name: "FAMB0008_V1"
}
export const cover = {
    docNumber: "FAMB0008",
    version: "V1",
    dateOfIssue: "21/08/2024",
    approvalDate: "27/08/2024",
    issuedBy: "ENGINEERING DIV.",
    title: meta.title,
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form  No.FQAG0017   19/Nov./'96",
    documentNo: 'FAMB0008',
    releaseNo: '1',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 58,
    date: "14 Feb 2025",
    model: 'AL100G PLUS',
    group: 'BODY'
}

export const checkpoint = {
    c1: "Magnet Z\n-ไม่เป็นรอยขีดข่วน\n- สกรูล็อคแน่นทุกตัว",
    c2: "Head \n- ทาน้ำมันสน",
    c3: "Bellows Z \n- ประกอบถูกต้อง\n ไม่กลับด้าน",
    c4: "Quill Plate\n- ใช้สกรู CS (BLK) M8x40\nกับ special washer 4 ชุด ใน\nการล็อค \n- ใช้ค่า torque = 200 kgf. \nและ มาร์คสีเหลืองทุกครั ้ง",
    c5: "Ceramic Base \n- ไม่เป็นรอยขีดข่วนบนผิว\nและขอบด้านข้าง \n- สกรูล็อคแน่นทุกตัว ",
    c6: "Slide Tank A \n- ไม่มีเศษผ้า,เศษเหล็ก,ใบ Plan \nหรือเครื่องมือตกค้างอยู ่ข้างใน ",
    c7: "Magnet Y \n- ไม่เป็นรอยขีดข่วน \n- สกรูล็อคแน่นทุกตัว",
    c8: "Bed  \n- ไม่มีเศษผ้า,เศษเหล็ก,ใบ Plan\nหรือเครื่องมือตกค้างอยู ่ข้างใน \n- ทาน ้ามันสน ",
    c9: "LM-Guide-Y\n- สกรูล็อคแน่นทุกตัว \n- ทาน ้ามันสนบริเวณรอบๆ",
    c10: "Saddle\n- ไม่มีเศษผ้า,เศษเหล็ก,ใบ Plan \nหรือเครื่องมือตกค้างอยู ่ข้างใน\n- ทาน ้ามันสน \n-สกรูล็อคแน่นทุกตัว ",
    c11: "Magnet X \n- ไม่เป็นรอยขีดข่วน \n- สกรูล็อคแน่นทุกตัว",
    c12: "Arm-X \n- ไม่มีเศษผ้า,เศษเหล็ก,ใบ Plan\nหรือเครื่องมือตกค้างอยู ่ข้างใน",
    c13: "Linear Coil \n- สกรูล็อคแน่นทุกตัว ",
}

// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;
