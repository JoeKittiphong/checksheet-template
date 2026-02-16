export const meta = {
    form_name: "FAMB0015",
    version: "1",
    title: "CHECK SHEET HEAD ASS'Y ",
    department: "EDM",
    model: "AD35L&AD55L",
    as_group: "BODY",
    checksheet_name: "FAMB0015_V1"
}
export const cover = {
    docNumber: "FAMB0015",
    version: "1",
    dateOfIssue: "10/06/2023",
    approvalDate: "15/06/2023",
    issuedBy: "ENGINEERING DIV.",
    title: meta.title,
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form  No.FQAG0017   19/Nov./'96",
    documentNo: 'FAMB0015',
    releaseNo: '1',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 6,
    date: "10 Jun 2025",
    model: 'AD35L&AD55L',
    group: 'BODY'
}

export const checkpoint = {
    // Example checkpoints
    // c1: "Description 1",
    // c2: "Description 2",
}

// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;
