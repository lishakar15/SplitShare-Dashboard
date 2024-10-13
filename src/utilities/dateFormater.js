export function formatDateToString(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = date.toLocaleString('en-US', options);
    const day = date.getDate();
    
    let suffix;
    if (day >= 11 && day <= 13) {
        suffix = 'th'; 
    } else {
        switch (day % 10) {
            case 1:
                suffix = 'st';
                break;
            case 2:
                suffix = 'nd';
                break;
            case 3:
                suffix = 'rd';
                break;
            default:
                suffix = 'th';
        }
    }
    const dayWithSuffix = `${day}${suffix}`;
    return formattedDate.replace(/(\d+)/, dayWithSuffix);
}

