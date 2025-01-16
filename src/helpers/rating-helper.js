export default function ratingHelper(rating) {
    return '★'.repeat(Math.trunc(rating)) + '☆'.repeat(Math.trunc(10 - rating));
}