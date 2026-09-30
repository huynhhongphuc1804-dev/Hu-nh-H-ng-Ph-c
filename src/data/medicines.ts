import { Medicine } from '../types';

export const MEDICINES_DATABASE: Medicine[] = [
  {
    id: 'panadol-extra',
    name: 'Panadol Extra',
    genericName: 'Paracetamol + Caffeine',
    brandName: 'Panadol',
    barcode: '8935001400234',
    registrationNumber: 'VN-18234-14',
    category: 'Giảm đau & Hạ sốt',
    dosageForm: 'Viên nén bao phim',
    strength: 'Paracetamol 500mg, Caffeine 65mg',
    manufacturer: 'GSK GlaxoSmithKline',
    country: 'Úc / Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: false,
    indications: [
      'Điều trị các cơn đau nhẹ đến vừa: đau đầu, đau nửa đầu, đau cơ, đau răng, đau họng, đau bụng kinh',
      'Hạ sốt nhanh chóng trong các trường hợp cảm cúm, sốt phát ban',
      'Tăng cường sự tỉnh táo nhờ thành phần Caffeine'
    ],
    dosage: {
      adults: '1 đến 2 viên mỗi 4 đến 6 giờ nếu cần. Tối đa không quá 8 viên trong 24 giờ.',
      children: 'Không khuyến cáo dùng cho trẻ em dưới 12 tuổi.',
      specialNotes: 'Khoảng cách giữa hai lần uống tối thiểu là 4 giờ. Không dùng cùng các sản phẩm khác chứa Paracetamol.'
    },
    contraindications: [
      'Quá mẫn cảm với Paracetamol, Caffeine hoặc bất kỳ thành phần nào của thuốc',
      'Bệnh nhân suy gan nặng hoặc suy thận nặng',
      'Người mắc chứng thiếu hụt men G6PD'
    ],
    sideEffects: [
      'Hiếm gặp: Ban đỏ da, mề đay, dị ứng',
      'Do caffeine: Mất ngủ, bồn chồn, tim đập nhanh nếu uống vào buổi tối'
    ],
    interactions: [
      'Không dùng chung với các thuốc chứa Paracetamol khác (nguy cơ quá liều độc gan)',
      'Hạn chế trà, cà phê đặc và thức uống có cồn (rượu bia) khi đang dùng thuốc',
      'Cần thận trọng khi dùng chung với thuốc chống đông máu Warfarin kéo dài'
    ],
    warnings: [
      'Tuyệt đối không uống rượu bia trong thời gian dùng thuốc vì tăng độc tính phá hủy gan',
      'Phụ nữ mang thai nên hỏi ý kiến bác sĩ (chứa caffeine)'
    ],
    storage: 'Bảo quản nơi khô ráo, dưới 30°C, tránh ánh sáng trực tiếp.',
    summaryVoice: 'Panadol Extra chứa Paracetamol 500 miligam và Caffeine 65 miligam. Dùng để giảm đau đầu, đau răng và hạ sốt. Người lớn uống từ 1 đến 2 viên mỗi 4 đến 6 tiếng. Tuyệt đối không uống quá 8 viên một ngày và tránh uống rượu bia.'
  },
  {
    id: 'augmentin-625',
    name: 'Augmentin 625mg',
    genericName: 'Amoxicillin + Clavulanic Acid',
    brandName: 'Augmentin',
    barcode: '8936001234567',
    registrationNumber: 'VN-20982-17',
    category: 'Kháng sinh',
    dosageForm: 'Viên nén bao phim',
    strength: 'Amoxicillin 500mg + Acid Clavulanic 125mg',
    manufacturer: 'Glaxo Wellcome Production',
    country: 'Pháp',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: true,
    indications: [
      'Nhiễm khuẩn đường hô hấp trên và dưới (viêm xoang, viêm tai giữa, viêm phế quản, viêm phổi)',
      'Nhiễm khuẩn đường tiết niệu và sinh dục (viêm bàng quang, viêm niệu đạo)',
      'Nhiễm khuẩn da, mô mềm, răng miệng, khớp'
    ],
    dosage: {
      adults: '1 viên 625mg mỗi 8 giờ (3 lần/ngày) hoặc 1 viên 1g mỗi 12 giờ tùy theo mức độ nhiễm khuẩn.',
      children: 'Tính theo cân nặng, ưu tiên dùng dạng hỗn dịch siro cho trẻ dưới 12 tuổi.',
      specialNotes: 'Nên uống thuốc vào đầu bữa ăn để giảm thiểu tác dụng phụ trên đường tiêu hóa.'
    },
    contraindications: [
      'Dị ứng với kháng sinh nhóm Penicillin hoặc Cephalosporin',
      'Tiền sử vàng da hoặc rối loạn chức năng gan liên quan đến Amoxicillin/Clavulanate'
    ],
    sideEffects: [
      'Thường gặp: Tiêu chảy, buồn nôn, khó tiêu (nên uống cùng bữa ăn)',
      'Ít gặp: Ngứa da, mề đay nhẹ'
    ],
    interactions: [
      'Giảm hiệu lực của thuốc tránh thai đường uống',
      'Tăng nồng độ Methotrexate trong máu nếu dùng đồng thời',
      'Thận trọng với thuốc chống đông máu'
    ],
    warnings: [
      'Cần uống đủ liệu trình từ 5 đến 7 ngày theo chỉ định của bác sĩ, không tự ý ngừng thuốc khi thấy triệu chứng thuyên giảm'
    ],
    storage: 'Bảo quản nơi khô mát, nhiệt độ không quá 25°C, tránh ẩm.',
    summaryVoice: 'Kháng sinh Augmentin 625 miligam trị nhiễm trùng đường hô hấp, tai mũi họng và răng miệng. Uống 1 viên vào đầu bữa ăn để hạn chế đau bụng. Cần uống đủ liều từ 5 đến 7 ngày theo đơn bác sĩ, không tự ý bỏ dở.'
  },
  {
    id: 'berberin-100',
    name: 'Berberin Clorid 100mg',
    genericName: 'Berberin Clorid',
    brandName: 'Berberin OPC',
    barcode: '8934567890123',
    registrationNumber: 'VD-24312-16',
    category: 'Tiêu hóa & Dạ dày',
    dosageForm: 'Viên nén bao đường',
    strength: '100mg',
    manufacturer: 'Dược phẩm OPC',
    country: 'Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: false,
    indications: [
      'Nhiễm trùng đường ruột, viêm ruột, tiêu chảy do vi khuẩn',
      'Hội chứng lỵ amip, lỵ trực trùng',
      'Đầy bụng, ăn uống khó tiêu, chướng bụng do thức ăn ôi thiu'
    ],
    dosage: {
      adults: 'Uống 2 đến 4 viên (100mg) mỗi lần, ngày 2 lần. Uống sau bữa ăn với nhiều nước.',
      children: 'Trẻ từ 2 - 4 tuổi: 1/2 viên/lần. Trẻ từ 5 - 15 tuổi: 1-2 viên/lần.',
      specialNotes: 'Bổ sung thêm nước và điện giải (Oresol) nếu tiêu chảy mất nước.'
    },
    contraindications: [
      'Phụ nữ đang mang thai (có thể kích thích co bóp tử cung gây sảy thai)',
      'Bệnh nhân mẫn cảm với Berberin'
    ],
    sideEffects: [
      'Rất ít tác dụng phụ, có thể gây táo bón nhẹ nếu dùng kéo dài'
    ],
    interactions: [
      'Có thể làm giảm hấp thu của một số loại thuốc khác nếu uống cùng một lúc (nên uống cách xa nhau 2 giờ)'
    ],
    warnings: [
      'Đặc biệt lưu ý: Không dùng cho phụ nữ có thai vì nguy cơ gây kích thích co bóp tử cung.'
    ],
    storage: 'Bảo quản nơi khô ráo, tránh ánh sáng trực tiếp, nhiệt độ dưới 30°C.',
    summaryVoice: 'Berberin 100 miligam là thuốc thảo dược trị tiêu chảy, rối loạn tiêu hóa và đau bụng. Người lớn uống 2 đến 4 viên mỗi lần, ngày 2 lần. Lưu ý quan trọng: Tuyệt đối không dùng cho phụ nữ mang thai.'
  },
  {
    id: 'nexium-20',
    name: 'Nexium 20mg (Esomeprazole)',
    genericName: 'Esomeprazole Magnesium',
    brandName: 'Nexium Mups',
    barcode: '8938001928374',
    registrationNumber: 'VN-17890-13',
    category: 'Tiêu hóa & Dạ dày',
    dosageForm: 'Viên nén kháng acid',
    strength: '20mg',
    manufacturer: 'AstraZeneca AB',
    country: 'Thụy Điển',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: true,
    indications: [
      'Điều trị và phòng ngừa bệnh trào ngược dạ dày thực quản (GERD)',
      'Viêm loét dạ dày - tá tràng do vi khuẩn Helicobacter pylori (Hp)',
      'Dự phòng loét dạ dày khi sử dụng thuốc chống viêm không steroid (NSAID)'
    ],
    dosage: {
      adults: '1 viên (20mg) hoặc 2 viên (40mg) một lần mỗi ngày vào buổi sáng, trước bữa ăn ít nhất 30 đến 60 phút.',
      children: 'Theo chỉ định riêng của bác sĩ cho trẻ từ 12 tuổi trở lên.',
      specialNotes: 'Nuốt nguyên viên với nước lọc, không được nhai nát hoặc nghiền vụn viên thuốc.'
    },
    contraindications: [
      'Dị ứng với Esomeprazole hoặc các thuốc ức chế bơm proton khác (Omeprazole, Pantoprazole)',
      'Đang sử dụng thuốc chống virus Nelfinavir'
    ],
    sideEffects: [
      'Nhức đầu, đau bụng, táo bón hoặc tiêu chảy nhẹ, buồn nôn'
    ],
    interactions: [
      'Làm giảm hấp thu của Ketoconazole, Itraconazole, muối sắt',
      'Tương tác với Clopidogrel (thuốc chống đông), Diazepam'
    ],
    warnings: [
      'Uống trước bữa ăn sáng 30 - 60 phút để đạt hiệu quả ức chế acid dạ dày cao nhất'
    ],
    storage: 'Bảo quản trong bao bì gốc ở nhiệt độ phòng dưới 30°C.',
    summaryVoice: 'Nexium 20 miligam điều trị trào ngược dạ dày, ợ chua và viêm loét tá tràng. Uống 1 viên vào buổi sáng trước khi ăn 30 phút. Phải nuốt nguyên viên thuốc, không nhai hoặc bẻ nhỏ.'
  },
  {
    id: 'amlodipine-5',
    name: 'Amlodipine 5mg',
    genericName: 'Amlodipine Besylate',
    brandName: 'Amlor / Amlodipine Stada',
    barcode: '8937001827162',
    registrationNumber: 'VD-21394-14',
    category: 'Tim mạch & Huyết áp',
    dosageForm: 'Viên nén',
    strength: '5mg',
    manufacturer: 'Stella Pharm / Pfizer',
    country: 'Việt Nam / Mỹ',
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: true,
    indications: [
      'Điều trị tăng huyết áp vô căn (đơn trị liệu hoặc phối hợp)',
      'Dự phòng các cơn đau thắt ngực ổn định mạn tính hoặc co thắt mạch vành'
    ],
    dosage: {
      adults: 'Khởi đầu 1 viên 5mg mỗi ngày một lần vào một giờ cố định (tốt nhất là buổi sáng). Bác sĩ có thể tăng lên 10mg sau 1-2 tuần.',
      children: 'Liều theo chỉ định đặc biệt của bác sĩ tim mạch.',
      specialNotes: 'Nên uống đều đặn mỗi ngày vào cùng một thời điểm để ổn định huyết áp cả ngày.'
    },
    contraindications: [
      'Huyết áp quá thấp (huyết áp tâm thu dưới 90 mmHg)',
      'Hẹp động mạch chủ nặng, sốc tim, suy tim chưa điều trị ổn định'
    ],
    sideEffects: [
      'Phù mắt cá chân (do giãn mạch), bừng đỏ mặt, đánh trống ngực nhẹ trong tuần đầu'
    ],
    interactions: [
      'Tránh uống nước ép bưởi chùm (grapefruit) vì làm tăng đột ngột nồng độ thuốc trong máu gây tụt huyết áp mạnh',
      'Thận trọng với thuốc ức chế CYP3A4 như Simvastatin (nên giảm liều Simvastatin)'
    ],
    warnings: [
      'Không được tự ý dừng thuốc đột ngột vì có thể làm bùng phát cơn tăng huyết áp kịch phát nguy hiểm.'
    ],
    storage: 'Bảo quản nơi khô ráo, tránh ánh sáng trực tiếp, nhiệt độ dưới 30°C.',
    summaryVoice: 'Amlodipine 5 miligam dùng điều trị tăng huyết áp và đau thắt ngực. Uống đều đặn 1 viên vào một giờ cố định mỗi sáng. Không được tự ý ngưng thuốc và tuyệt đối không ăn bưởi chùm khi uống thuốc.'
  },
  {
    id: 'glucophage-500',
    name: 'Glucophage 500mg',
    genericName: 'Metformin Hydrochloride',
    brandName: 'Glucophage',
    barcode: '8939002817263',
    registrationNumber: 'VN-16523-13',
    category: 'Tiểu đường',
    dosageForm: 'Viên nén bao phim',
    strength: '500mg',
    manufacturer: 'Merck Sante s.a.s',
    country: 'Pháp',
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: true,
    indications: [
      'Điều trị bệnh đái tháo đường típ 2 ở người lớn và trẻ em từ 10 tuổi trở lên',
      'Đặc biệt hiệu quả ở bệnh nhân thừa cân, béo phì khi chế độ ăn kiêng và tập luyện không kiểm soát được đường huyết'
    ],
    dosage: {
      adults: 'Bắt đầu bằng 1 viên (500mg) mỗi ngày 1 đến 2 lần. Uống trong hoặc ngay sau bữa ăn để giảm kích ứng dạ dày.',
      children: '1 viên 500mg/ngày cho trẻ từ 10 tuổi trở lên.',
      specialNotes: 'Tăng liều từ từ theo hướng dẫn xét nghiệm đường huyết của bác sĩ.'
    },
    contraindications: [
      'Suy thận vừa đến nặng (độ lọc cầu thận eGFR < 30 mL/phút)',
      'Nhiễm toan chuyển hóa cấp hoặc mạn tính, tiền hôn mê do tiểu đường',
      'Nghiện rượu cấp tính hoặc ngộ độc cồn'
    ],
    sideEffects: [
      'Khó chịu đường tiêu hóa: buồn nôn, tiêu chảy, đầy bụng, vị kim loại trong miệng (sẽ giảm dần khi uống sau ăn)'
    ],
    interactions: [
      'Tránh uống rượu vì tăng nguy cơ nhiễm toan acid lactic nghiêm trọng',
      'Tạm ngừng thuốc trước khi chụp X-quang hoặc CT có tiêm thuốc cản quang chứa iod'
    ],
    warnings: [
      'Luôn uống thuốc ngay trong hoặc sau bữa ăn để tránh đau dạ dày và tiêu chảy.'
    ],
    storage: 'Bảo quản nhiệt độ dưới 30°C nơi khô ráo.',
    summaryVoice: 'Glucophage 500 miligam chứa Metformin điều trị tiểu đường tuýp 2. Hãy uống 1 viên ngay trong hoặc sau bữa ăn để tránh đau bụng khó tiêu. Tuyệt đối kiêng rượu bia để tránh biến chứng toan máu.'
  },
  {
    id: 'telfast-180',
    name: 'Telfast HD 180mg',
    genericName: 'Fexofenadine Hydrochloride',
    brandName: 'Telfast',
    barcode: '8936009876543',
    registrationNumber: 'VN-19823-15',
    category: 'Dị ứng & Hô hấp',
    dosageForm: 'Viên nén bao phim',
    strength: '180mg',
    manufacturer: 'Sanofi Aventis',
    country: 'Mỹ / Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: false,
    indications: [
      'Điều trị triệu chứng viêm mũi dị ứng theo mùa: hắt hơi, sổ mũi, ngứa mũi, nghẹt mũi, đỏ mắt chảy nước mắt',
      'Mề đay tự phát mạn tính: ngứa da, nổi sẩn phù dị ứng'
    ],
    dosage: {
      adults: '1 viên (180mg) một lần duy nhất trong ngày với nhiều nước.',
      children: 'Dùng cho người lớn và trẻ em từ 12 tuổi trở lên.',
      specialNotes: 'Thuốc kháng histamin thế hệ mới, hầu như KHÔNG gây buồn ngủ, an toàn cho người lái xe và làm việc văn phòng.'
    },
    contraindications: [
      'Dị ứng với Fexofenadine hoặc các thành phần của thuốc'
    ],
    sideEffects: [
      'Rất hiếm gặp: Mệt mỏi nhẹ, nhức đầu thoáng qua'
    ],
    interactions: [
      'Thuốc kháng acid dạ dày chứa nhôm hoặc magie làm giảm hấp thu Telfast (uống cách nhau 2 giờ)',
      'Nước ép hoa quả (cam, táo, bưởi) có thể làm giảm sinh khả dụng của thuốc'
    ],
    warnings: [
      'Nên uống với nước lọc tinh khiết, tránh uống chung với nước cam hoặc nước ép bưởi.'
    ],
    storage: 'Bảo quản ở nhiệt độ phòng dưới 30°C.',
    summaryVoice: 'Telfast HD 180 miligam điều trị dị ứng, mề đay và viêm mũi hắt hơi. Uống 1 viên một ngày với nước lọc. Thuốc không gây buồn ngủ nên bạn có thể yên tâm lái xe và làm việc.'
  },
  {
    id: 'smecta-3g',
    name: 'Smecta 3g',
    genericName: 'Diosmectite',
    brandName: 'Smecta',
    barcode: '8935008912345',
    registrationNumber: 'VN-15421-12',
    category: 'Tiêu hóa & Dạ dày',
    dosageForm: 'Bột pha hỗn dịch uống',
    strength: '3g / gói',
    manufacturer: 'Ipsen Pharma',
    country: 'Pháp',
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: false,
    indications: [
      'Điều trị tiêu chảy cấp ở trẻ em và người lớn (kết hợp với bù nước điện giải Oresol)',
      'Điều trị các triệu chứng đau liên quan đến thực quản, dạ dày và ruột'
    ],
    dosage: {
      adults: 'Trung bình 3 gói mỗi ngày, chia làm 3 lần. Pha trong nửa ly nước ấm hoặc khuấy đều vào thức ăn sệt.',
      children: 'Trẻ dưới 1 tuổi: 1 gói/ngày. Trẻ từ 1 đến 2 tuổi: 1-2 gói/ngày.',
      specialNotes: 'Nên uống cách xa các thuốc khác ít nhất 2 giờ vì Smecta bao phủ niêm mạc làm giảm hấp thu các thuốc khác.'
    },
    contraindications: [
      'Mẫn cảm với Diosmectite',
      'Bệnh nhân không dung nạp fructose di truyền'
    ],
    sideEffects: [
      'Rất hiếm gặp tình trạng táo bón nhẹ (sẽ hết khi giảm liều)'
    ],
    interactions: [
      'Đặc tính hấp phụ của Smecta có thể làm cản trở hấp thu các thuốc dùng kèm. Luôn uống thuốc khác trước 2 giờ hoặc sau 2 giờ.'
    ],
    warnings: [
      'Quan trọng nhất khi tiêu chảy là phải bù nước điện giải đầy đủ bằng gói Oresol.'
    ],
    storage: 'Bảo quản nơi khô ráo, nhiệt độ không quá 25°C.',
    summaryVoice: 'Thuốc bột Smecta 3 gam trị đau bụng tiêu chảy cấp. Pha 1 gói với nửa cốc nước ấm, ngày uống 3 lần. Nhớ uống cách xa các loại thuốc khác 2 tiếng để không bị mất tác dụng thuốc.'
  },
  {
    id: 'hapacol-650',
    name: 'Hapacol 650mg',
    genericName: 'Paracetamol',
    brandName: 'Hapacol 650',
    barcode: '8934842100123',
    registrationNumber: 'VD-21389-14',
    category: 'Giảm đau & Hạ sốt',
    dosageForm: 'Viên nén bao phim',
    strength: '650mg',
    manufacturer: 'Dược Hậu Giang (DHG Pharma)',
    country: 'Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: false,
    indications: [
      'Hạ sốt, giảm đau nhanh chóng cho người lớn và người có thể trọng từ 50kg trở lên',
      'Đau đầu, đau nhức xương khớp, đau cơ bắp, đau họng, sốt xuất huyết, cảm cúm'
    ],
    dosage: {
      adults: '1 viên mỗi 4 đến 6 giờ nếu còn đau hoặc sốt. Tối đa không quá 6 viên (4g Paracetamol) trong 24 giờ.',
      children: 'Chỉ dùng cho người lớn và trẻ em từ 12 tuổi trở lên (thể trọng > 43kg).',
      specialNotes: 'Hàm lượng 650mg rất phù hợp với thể trạng người trưởng thành Việt Nam.'
    },
    contraindications: [
      'Quá mẫn cảm với Paracetamol',
      'Người bệnh suy gan, suy thận nặng hoặc thiếu hụt men G6PD'
    ],
    sideEffects: ['Hiếm gặp ban da dị ứng, buồn nôn'],
    interactions: ['Tránh uống rượu bia, không dùng cùng lúc với các thuốc khác chứa Paracetamol.'],
    warnings: ['Khoảng cách giữa hai lần uống thuốc tối thiểu phải từ 4 đến 6 giờ.'],
    storage: 'Bảo quản nơi khô ráo, nhiệt độ dưới 30°C.',
    summaryVoice: 'Hapacol 650 miligam chứa Paracetamol giúp giảm đau hạ sốt hiệu quả cho người lớn. Uống 1 viên mỗi 4 đến 6 tiếng. Tuyệt đối không uống quá 6 viên trong một ngày và tránh uống rượu bia.'
  },
  {
    id: 'efferalgan-500',
    name: 'Efferalgan 500mg (Viên sủi)',
    genericName: 'Paracetamol',
    brandName: 'Efferalgan',
    barcode: '8935012300055',
    registrationNumber: 'VN-18921-15',
    category: 'Giảm đau & Hạ sốt',
    dosageForm: 'Viên nén sủi bọt',
    strength: '500mg',
    manufacturer: 'UPSA SAS',
    country: 'Pháp',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: false,
    indications: [
      'Hạ sốt và giảm các cơn đau vừa và nhẹ: đau đầu, đau răng, đau nhức mình mẩy do cảm cúm',
      'Hấp thu rất nhanh vào máu nhờ dạng sủi bọt'
    ],
    dosage: {
      adults: 'Hòa tan hoàn toàn 1 đến 2 viên trong một cốc nước đầy. Uống mỗi 4 đến 6 giờ khi cần (tối đa 8 viên/ngày).',
      children: 'Dùng cho người lớn và trẻ em cân nặng từ 13kg trở lên (theo liều 60mg/kg/ngày).',
      specialNotes: 'Phải chờ viên sủi tan hết bọt hoàn toàn trong nước mới được uống.'
    },
    contraindications: [
      'Dị ứng Paracetamol, suy gan nặng',
      'Người phải kiêng muối nghiêm ngặt (viên sủi chứa hàm lượng Natri)'
    ],
    sideEffects: ['Dị ứng da hiếm gặp'],
    interactions: ['Không uống rượu bia, cẩn trọng khi đang dùng thuốc chống đông máu.'],
    warnings: ['Chứa 412mg Natri trong mỗi viên, cần lưu ý với người cao huyết áp hoặc ăn kiêng muối.'],
    storage: 'Bảo quản kín nơi khô ráo dưới 30°C, tránh ẩm.',
    summaryVoice: 'Efferalgan 500 miligam dạng sủi hạ sốt giảm đau nhanh. Thả 1 đến 2 viên vào cốc nước lọc, đợi tan hết rồi uống. Do có muối natri nên người bị cao huyết áp cần lưu ý.'
  },
  {
    id: 'eugica-capsule',
    name: 'Eugica Xanh (Thảo dược trị ho)',
    genericName: 'Eucalyptol + Menthol + Tinh dầu Tràm, Gừng, Tần',
    brandName: 'Eugica',
    barcode: '8934842200334',
    registrationNumber: 'VD-23481-15',
    category: 'Dị ứng & Hô hấp',
    dosageForm: 'Viên nang mềm',
    strength: 'Eucalyptol 100mg, Menthol 0.5mg, Tinh dầu Gừng 0.75mg, Tinh dầu Tần 0.36mg',
    manufacturer: 'Dược Hậu Giang / Mega Lifesciences',
    country: 'Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: false,
    indications: [
      'Điều trị các chứng ho do cảm cúm, ho gió, ho khan, ho có đờm',
      'Làm ấm đường hô hấp, sát trùng đường thở, giảm đau rát cổ họng khản tiếng'
    ],
    dosage: {
      adults: 'Uống mỗi lần 2 viên, ngày 3 lần sau ăn.',
      children: 'Trẻ em trên 30 tháng tuổi: Uống mỗi lần 1 viên, ngày 3 lần.',
      specialNotes: 'Nuốt nguyên viên nang với nước lọc.'
    },
    contraindications: [
      'Trẻ em dưới 30 tháng tuổi hoặc trẻ có tiền sử động kinh, sốt cao co giật',
      'Mẫn cảm với bất kỳ thành phần tinh dầu nào trong thuốc'
    ],
    sideEffects: ['Đôi khi có cảm giác ấm nóng ở dạ dày thoáng qua'],
    interactions: ['Chưa có ghi nhận tương tác nguy hiểm với các thuốc khác.'],
    warnings: ['Không dùng cho trẻ em quá nhỏ dưới 30 tháng tuổi.'],
    storage: 'Bảo quản nơi khô mát, nhiệt độ dưới 30°C.',
    summaryVoice: 'Eugica xanh là viên tinh dầu thảo dược giúp giảm ho, tan đờm và ấm họng. Người lớn uống 2 viên mỗi lần, ngày 3 lần. Không dùng cho trẻ em dưới 30 tháng tuổi.'
  },
  {
    id: 'decolgen-forte',
    name: 'Decolgen Forte',
    genericName: 'Paracetamol + Phenylephrine + Chlorpheniramine',
    brandName: 'Decolgen',
    barcode: '8935084900123',
    registrationNumber: 'VD-21098-14',
    category: 'Giảm đau & Hạ sốt',
    dosageForm: 'Viên nén',
    strength: 'Paracetamol 500mg, Phenylephrine 10mg, Chlorpheniramine 2mg',
    manufacturer: 'United Pharma',
    country: 'Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: false,
    indications: [
      'Điều trị các triệu chứng cảm cúm: sốt, nhức đầu, sổ mũi, nghẹt mũi, hắt hơi, ngứa mắt chảy nước mắt',
      'Giảm sung huyết xoang mũi'
    ],
    dosage: {
      adults: '1 đến 2 viên mỗi 4 đến 6 giờ. Tối đa không quá 6 viên trong 24 giờ.',
      children: 'Trẻ từ 7 đến 12 tuổi: 1/2 đến 1 viên mỗi 4 đến 6 giờ.',
      specialNotes: 'Thuốc có thể gây buồn ngủ nhẹ, tránh lái xe sau khi uống.'
    },
    contraindications: [
      'Người cao huyết áp nặng, bệnh động mạch vành nặng, cường giáp',
      'Đang sử dụng thuốc chống trầm cảm ức chế MAO'
    ],
    sideEffects: ['Buồn ngủ, khô miệng, hoa mắt nhẹ'],
    interactions: ['Tránh uống rượu bia và các thuốc an thần khác gây tăng tác dụng buồn ngủ.'],
    warnings: ['Thuốc gây buồn ngủ, thận trọng khi lái xe hoặc vận hành máy móc.'],
    storage: 'Bảo quản nơi khô ráo, tránh ánh sáng trực tiếp, nhiệt độ dưới 30°C.',
    summaryVoice: 'Decolgen Forte trị cảm cúm, hạ sốt, thông mũi và giảm sổ mũi. Người lớn uống 1 đến 2 viên mỗi 4 đến 6 tiếng. Lưu ý thuốc có thể gây buồn ngủ nên không lái xe sau khi uống.'
  },
  {
    id: 'phosphalugel-p',
    name: 'Phosphalugel (Thuốc dạ dày chữ P)',
    genericName: 'Aluminium Phosphate gel 20%',
    brandName: 'Phosphalugel',
    barcode: '8934658001221',
    registrationNumber: 'VN-16892-13',
    category: 'Tiêu hóa & Dạ dày',
    dosageForm: 'Hỗn dịch uống (dạng gói)',
    strength: 'Nhôm phosphat 12.38g / gói 20g',
    manufacturer: 'Sanofi-Synthelabo',
    country: 'Pháp / Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=600&auto=format&fit=crop&q=80',
    requiresPrescription: false,
    indications: [
      'Đau rát dạ dày cấp và mạn tính, ợ chua, viêm loét dạ dày - tá tràng',
      'Trào ngược dạ dày thực quản, bỏng rát sau xương ức'
    ],
    dosage: {
      adults: 'Uống 1 đến 2 gói mỗi lần, ngày 2 đến 3 lần. Uống nguyên chất hoặc pha với một ít nước.',
      children: 'Theo chỉ định của bác sĩ (thường 1/4 đến 1/2 gói/lần).',
      specialNotes: 'Uống khi có cơn đau hoặc theo chỉ dẫn: sau ăn 1-2 giờ hoặc trước khi đi ngủ.'
    },
    contraindications: ['Bệnh nhân suy thận nặng mạn tính, mẫn cảm với nhôm phosphat'],
    sideEffects: ['Có thể gây táo bón nhẹ ở người cao tuổi'],
    interactions: ['Làm giảm hấp thu nhiều loại thuốc khác. Luôn uống thuốc khác cách xa ít nhất 2 giờ.'],
    warnings: ['Nên uống cách xa các loại thuốc kháng sinh và thuốc tim mạch ít nhất 2 giờ.'],
    storage: 'Bảo quản nhiệt độ dưới 30°C nơi khô mát.',
    summaryVoice: 'Phosphalugel là thuốc dạ dày chữ P giúp làm dịu cơn đau rát dạ dày và ợ chua. Uống 1 đến 2 gói khi đang đau hoặc sau bữa ăn 1 tiếng. Nhớ uống cách các thuốc khác 2 tiếng.'
  }
];

export const CATEGORIES = [
  'Tất cả',
  'Giảm đau & Hạ sốt',
  'Kháng sinh',
  'Tiêu hóa & Dạ dày',
  'Tim mạch & Huyết áp',
  'Tiểu đường',
  'Dị ứng & Hô hấp'
];
