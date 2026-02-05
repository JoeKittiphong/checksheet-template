export const meta = {
    form_name: "FAWI0005",
    version: "V3",
    title: "TEST CUT-2 AL400G & AL600G (iG+E)",
    department: "EDW",
    model: "AL400G",
    as_group: "FINAL",
    checksheet_name: "FAWI0005_V3"
}
export const cover = {
    docNumber: "FAWI0005",
    version: "V3",
    dateOfIssue: "14-02-2025",
    approvalDate: "21-04-2025",
    issuedBy: "ENGINEERING DIV.",
    title: meta.title,
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form  No.FQAG0017   19/Nov./'96",
    documentNo: 'FAWI0005',
    releaseNo: '3',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 138,
    date: "14 Feb 2025",
    model: 'AL400G',
    group: 'FINAL'
}

export const checkpoint = {
    // Example checkpoints
    // c1: "Description 1",
    // c2: "Description 2",
}

// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;
