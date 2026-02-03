export const meta = {
    form_name: "FAWI0008",
    version: "V3",
    title: "CHECK LIST STICKER AL400G&AL600G",
    department: "EDW",
    model: "AL400G&AL600G",
    as_group: "FINAL",
    checksheet_name: "FAWI0008_V3"
}
export const cover = {
    docNumber: "FAWI0008",
    version: "V3",
    dateOfIssue: "07/01/2026",
    approvalDate: "26/01/2026",
    issuedBy: "ENGINEERING DIV.",
    title: meta.title,
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form  No.FQAG0017   19/Nov./'96",
    documentNo: 'FAWI0008',
    releaseNo: '3',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 16,
    date: "7 Jan 2026",
    model: 'AL400G&AL600G',
    group: 'FINAL'
}

export const checkpoint = {
    // Example checkpoints
    // c1: "Description 1",
    // c2: "Description 2",
}

// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;
