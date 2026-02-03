export const meta = {
    form_name: "FAWI0026",
    version: "V2",
    title: "CHECK LIST STICKER ALN400Q&ALN600Q (iG+E)",
    department: "EDW",
    model: "ALN400Q&ALN600Q(iG+E)",
    as_group: "FINAL",
    checksheet_name: "FAWI0026_V2"
}
export const cover = {
    docNumber: "FAWI0026",
    version: "V2",
    dateOfIssue: "08/01/2026",
    approvalDate: "26/01/2026",
    issuedBy: "ENGINEERING DIV.",
    title: meta.title,
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form  No.FQAG0017   19/Nov./'96",
    documentNo: 'FAWI0026',
    releaseNo: '2',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 16,
    date: "8 Jan 2025",
    model: 'ALN400Q&ALN600Q(iG+E)',
    group: 'FINAL & FINISH GOODS'
}

export const checkpoint = {
    // Example checkpoints
    // c1: "Description 1",
    // c2: "Description 2",
}

// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;
