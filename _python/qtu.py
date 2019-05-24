import xlrd;

xls = xlrd.open_workbook("Queda de tensão unitária.xlsx");
cabos = [];

for nome_sheet in xls.sheet_names():
    sheet = xls.sheet_by_name(nome_sheet);

    for n in range(sheet.nrows):
        linha = sheet.row_values(n);
        cabos.append(linha);


def getCabo(cabo):
    for n in cabos:
        if n[0] == cabo:
            return n;
    return None;


def getQTU(cabo, tensao, fp):
    qtu = getCabo(cabo).copy();

    del qtu[0];

    if tensao < 220:
        del qtu[0];
        del qtu[0];
    else:
        qtu.pop();
        qtu.pop();

    if fp == 1:
        return qtu[1];
    else:
        return qtu[0]


def printQTU():
    print('Tipo de ', 'T=220', 'T=220', 'T=110', 'T=110', '', sep='\t|\t');
    print('cabo\t', 'FP=0,92', 'FP=1', 'FP=0,92', 'FP=1', '', sep='\t|\t');
    print('-------------------------------------------------------------');
    for i in cabos:
        for j in i:
            print(j, '\t|\t', sep='', end='');
        print();