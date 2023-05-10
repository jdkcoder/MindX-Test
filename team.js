const input = [60, 40, 55, 75, 64]

function chiaTeam(arr) {
    if (arr.length > 0) {
        //nếu array có value
        const team1 = [];
        const team2 = [];
        let valid = arr.every((i) => typeof i === "number"); //kiểm tra xem toàn bộ element trong array có phải là số hay không

        if (valid) {
            arr.forEach((kg, index) => (index % 2 ? team2.push(kg) : team1.push(kg))); //chia team

            /* Tỉnh tổng cân nặng 2 team */
            let totalKgTeam1 = 0;
            if (team1.length > 0) team1.forEach((i) => (totalKgTeam1 += i)); //tính tổng kg team 1

            let totalKgTeam2 = 0;
            if (team2.length > 0) team2.forEach((i) => (totalKgTeam2 += i)); //tính tổng kg team 2

            console.log([totalKgTeam1, totalKgTeam2]);
        } else console.error("Kiểm tra lại array, toàn bộ phải là số, VD: [60, 40, 55]");
        
    } else console.error("Array trống");
}


chiaTeam(input)