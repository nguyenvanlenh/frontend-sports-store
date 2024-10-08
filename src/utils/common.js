export const formatCurrencyVN = (number) => {
    if (typeof number !== 'number' || isNaN(number))
        return "0 đ";
    const formattedNumber = number.toLocaleString('vi-VN');
    return `${formattedNumber} đ`;
};

export const slugify = (string) => {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        .replace(/đ/gi, 'd')
        .replace(/\s+/g, '-')
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
}

export const maskText = (text) => {
    if (!text) return "anonymousUser";

    const len = text.length;
    if (len < 5) return text;

    const firstPart = text.slice(0, Math.floor(len / 2));
    const secondPart = text.slice(Math.floor(len / 2));

    const maskedFirstPart = firstPart.slice(0, 2) +
        "*".repeat(Math.max(0, firstPart.length - 4)) + firstPart.slice(-2);

    const maskedText = maskedFirstPart + secondPart;

    return maskedText;
}
export const formatDateTimeVN = (input) => {
    if (!input)
        return "";
    const date = new Date(input);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false
    };

    return new Intl.DateTimeFormat('vi-VN', options).format(date);
}
export const validateImageFile = (file, maxSizeInMB) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!validImageTypes.includes(file.type)) {
        return { isValid: false, message: "File không phải là hình ảnh hợp lệ" };
    }

    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
        return { isValid: false, message: `Dung lượng file vượt quá ${maxSizeInMB} MB` };
    }

    return { isValid: true, message: "File hợp lệ" };
}


