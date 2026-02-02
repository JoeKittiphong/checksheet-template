export const meta = {
    form_name: "FAWI0006",
    version: "V3",
    title: "CHECK LIST STICKER ALN400G&ALN600G (iG+E)",
    department: "EDW",
    model: "ALN400G(iG+E)&ALN600G(iG+E)",
    as_group: "FINAL",
    checksheet_name: "FAWI0006_V3"
}
export const cover = {
    docNumber: "FAWI0006",
    version: "V3",
    dateOfIssue: new Date().toISOString().split('T')[0],
    approvalDate: new Date().toISOString().split('T')[0],
    issuedBy: "ENGINEERING DIV.",
    title: meta.title,
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form  No.FQAG0017   19/Nov./'96",
    documentNo: 'FAWI0006',
    releaseNo: '3',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 26,
    date: "14 Feb 2025",
    model: 'ALN400G&ALN600G (iG+E)',
    group: 'FINAL'
}

export const checkpoint = {
    // Example checkpoints
    // c1: "Description 1",
    // c2: "Description 2",
}

// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;
