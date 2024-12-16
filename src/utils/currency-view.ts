
export const currencyFormatter = (value: number | string) => {
    const formatter = new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' });
    return formatter.format(Number(value));
}