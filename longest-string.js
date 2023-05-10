const arr = ["BINH", "HUNG", "PHUOC", "CAO", "KHANH"];

function longestString(arr) {
    if (arr.length > 0) { //nếu array có value
        let maxLength = 0;
        let longest = [];
        let valid = arr.every(i => typeof i === 'string'); //kiểm tra xem array có phải là string hay không
        if(valid) {
            arr.forEach((i) => {
                if (i.length > maxLength) { //nếu string hiện tại lớn hơn maxLength ban đầu
                    maxLength = i.length; //maxLength = luôn length của string hiện tại
                    longest = [i]; //longest = [string hiện tại]
                }
                if (i.length === maxLength)  longest.push(i); // nếu length của string hiện tại = maxLength thì push string hiện tại vào longest
            });
            console.log(longest);//['PHUOC', 'KHANH']
            else console.error('Kiểm tra lại array');
        } 
    } else console.error('Array trống')
}

longestString(arr);
