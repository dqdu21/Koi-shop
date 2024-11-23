import { format } from 'date-fns';


export const formatDate = (dateString: string): string => {
  if (!dateString) return ''; // Kiểm tra nếu dateString không tồn tại
  try {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd'); // Định dạng ngày thành "YYYY-MM-DD"
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Trả lại ngày gốc nếu lỗi
  }
};


export const formatDateTime = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm:ss'); // Định dạng ngày thành "YYYY-MM-DD HH:mm:ss"
  } catch (error) {
    console.error('Error formatting date-time:', error);
    return dateString; // Trả lại ngày gốc nếu lỗi
  }
};

export const formatDateForEdit = (date: string | null): Date | null => {
  if (!date) return null;
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
};
