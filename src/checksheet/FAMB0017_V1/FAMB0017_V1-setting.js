export const meta = {
    form_name: "FAMB0017",
    version: "1",
    title: "CHECK SHEET BODY ASS'Y OF K1C",
    department: "EDM",
    model: "K1C SD&K1C CE",
    as_group: "BODY",
    checksheet_name: "FAMB0017_V1"
}
export const cover = {
    docNumber: "FAMB0017",
    version: "11",
    dateOfIssue: "20/03/2025",
    approvalDate: "20/04/2025",
    issuedBy: "ENGINEERING DIV.",
    title: meta.title,
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form  No.FQAG0017   19/Nov./'96",
    documentNo: 'FAMB0017',
    releaseNo: '1',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 6,
    date: "20 Mar 2025",
    model: 'K1C',
    group: 'BODY'
}

export const checkpoint = {
    // Example checkpoints
    // c1: "Description 1",
    // c2: "Description 2",
}

// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;
