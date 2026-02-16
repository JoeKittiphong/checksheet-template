export const meta = {
    form_name: "FAMB0014",
    version: "V2",
    title: "CHECK SHEET HEAD ASS'Y ",
    department: "EDM",
    model: " AL40G Plus&AL60G Plus",
    as_group: "BODY",
    checksheet_name: "FAMB0014_V2"
}
export const cover = {
    docNumber: "FAMB0014",
    version: "V2",
    dateOfIssue: "21/05/2024",
    approvalDate: "30/05/2024",
    issuedBy: "ENGINEERING DIV.",
    title: meta.title,
    company: "Sodick ( Thailand ) Co., Ltd."
};

export const content = {
    formNumber: "Form  No.FQAG0017   19/Nov./'96",
    documentNo: 'FAMB0014',
    releaseNo: '2',
    controlBy: 'Assembly Division',
    title: 'Check Sheet',
    subtitle: 'ASSEMBLY',
    company: 'Sodick (Thailand) Co.,Ltd',
    totalPage: 58,
    date: "20 May 2024",
    model: 'AL40G/AL60GPlus',
    group: 'BODY'
}

export const checkpoint = {
    // Example checkpoints
    // c1: "Description 1",
    // c2: "Description 2",
}

// In development, we use localhost:3000. In production, we use the same origin.
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;
