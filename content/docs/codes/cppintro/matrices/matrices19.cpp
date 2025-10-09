for (int c = 0; c <= coloane + 1; c++) {
    // Bordarea liniei 0
    mat[0][c] = -1;

    // Bordarea ultimei linii
    mat[randuri + 1][c] = -1;
}

for (int r = 0; r <= randuri + 1; r++) {
    // Bordarea primei coloane
    mat[r][0] = -1;

    // Bordarea ultimei coloane
    mat[r][coloane + 1] = -1;
}