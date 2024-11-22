const applyVoucher = async (voucherCode: string, cartId: string): Promise<{ success: boolean; discountAmount?: number; message?: string }> => {
    try {
      const response = await fetch('/api/voucher/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voucherCode, // Mã voucher
          cartId, // ID của giỏ hàng
        }),
      });
  
      // Kiểm tra kết quả trả về từ API
      if (!response.ok) {
        throw new Error(`Failed to apply voucher: ${response.status}`);
      }
  
      const result = await response.json();
  
      // Kiểm tra thành công hay thất bại
      if (result.success) {
        return {
          success: true,
          discountAmount: result.discountAmount, // Số tiền giảm giá trả về từ API
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to apply voucher.',
        };
      }
    } catch (error) {
      console.error('Error applying voucher:', error);
      return {
        success: false,
        message: 'An error occurred while applying the voucher.',
      };
    }
  };
  