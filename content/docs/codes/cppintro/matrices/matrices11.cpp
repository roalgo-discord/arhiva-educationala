for (int r = 1; r <= 7; r++) {
    for (int c = 1; c <= 7; c++) {
        if (r > c && r + c > 7 + 1) {
            mat[r][c] = 4;
        } else {
            mat[r][c] = 2;
        }
    }
}