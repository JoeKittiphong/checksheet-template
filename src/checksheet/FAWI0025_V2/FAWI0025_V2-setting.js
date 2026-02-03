export const meta = {
    form_name: "FAWI0025",
    version: "V2",
    title: "CHECK LIST STICKER ALN400&ALN600 (iG+E) (Spanish)",
    department: "EDW",
    model: "ALN400(iG+E)&ALN600(iG+E)",
    as_group: "FINAL",
    checksheet_name: "FAWI0025_V2"
}
export const cover = {
    docNumber: "FAWI0025",
    version: "V2",
    dateOfIssue: "08/01/2026",
    approvalDate: "26/01/2026",
    issuedBy: "ENGINEERING DIV.",
    title: meta.title,
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form  No.FQAG0017   19/Nov./'96",
    documentNo: 'FAWI0025',
    releaseNo: '2',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 16,
    date: "08 Jan 2026",
    model: 'ALN400(iG+E)&ALN600(iG+E)',
    group: 'FINAL'
}

export const checkpoint = {
    // Example checkpoints
    // c1: "Description 1",
    // c2: "Description 2",
}

// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;
