const messages = {
  id: {
    required: '{label} harus diisi',
    minlength: 'Minimal {minLength} karakter',
    maxlength: 'Maksimal {maxLength} karakter',
    alphabetic: '{label} ini hanya boleh berisi huruf',
    specialChar:
      '{label} tidak boleh mengandung karakter khusus: {specialChars}',
    number: 'Nilai harus berupa angka',
    minValue: 'Nilai harus lebih besar atau sama dengan {minValue}',
    maxValue: 'Nilai harus lebih kecil atau sama dengan {maxValue}',
    email: 'Format email tidak valid',
    file: '{label} harus diisi dengan file',
    fileType: 'Format file harus bertipe: {allowedExtensions}',
    fileSize: 'Ukuran file tidak boleh lebih dari {sizeLimit} {sizeUnit}',
    minselection: 'Minimal {minSelection} pilihan {label}.',
    maxselection: 'Maksimal {maxSelection} pilihan {label}.',
  },
  en: {
    required: '{label} is required',
    minlength: 'Minimum {minLength} characters',
    maxlength: 'Maximum {maxLength} characters',
    alphabetic: '{label} can only contain letters',
    specialChar: '{label} cannot contain special characters: {specialChars}',
    number: 'Value must be a number',
    minValue: 'Value must be greater than or equal to {minValue}',
    maxValue: 'Value must be less than or equal to {maxValue}',
    email: 'Invalid email format',
    file: '{label} must be filled with a file',
    fileType: 'File format must be one of: {allowedExtensions}',
    fileSize: 'File size cannot exceed {sizeLimit} {sizeUnit}',
    minselection: 'Minimum {minSelection} selection for {label}.',
    maxselection: 'Maximum {maxSelection} selection for {label}.',
  },
};

let currentLangValidation = 'id';

/**
 * menampilkan string error message
 * @param {string} pesan
 * @returns
 */
function getErrorMessage(pesan) {
  return /* html */ `
    <div class="error mt-1" style="font-weight:normal;color:red;font-size:12px;">
      <em>${pesan}</em>
    </div>`;
}

// VALIDATION SET ================================================================================

/**
 * Menampilkan pesan error di bawah elemen input.
 * @param {HTMLElement} element - Elemen yang divalidasi.
 * @param {string} pesan - Pesan error yang akan ditampilkan.
 */
function validation(element, pesan) {
  const errorPlaceSelector = $(element).data('errorplace');
  $(element).removeClass('is-invalid');

  if (errorPlaceSelector) {
    $(errorPlaceSelector).html(getErrorMessage(pesan));
  } else {
    $(element).next('.error').remove();
    $(element).after(getErrorMessage(pesan));
  }

  $(element).addClass('is-invalid');
}

/**
 * Menampilkan pesan error untuk elemen select dan select2.
 * @param {HTMLElement} element - Elemen yang divalidasi.
 * @param {string} pesan - Pesan error yang akan ditampilkan.
 */
function validationSelect(element, pesan) {
  const errorPlaceSelector = $(element).data('errorplace');

  if ($(element).hasClass('select2-hidden-accessible')) {
    if (errorPlaceSelector) {
      $(errorPlaceSelector).html(getErrorMessage(pesan));
    } else {
      $(element).next('.select2-container').after(getErrorMessage(pesan));
    }

    $(element).next().find('.select2-selection').parent().addClass('has-error');
  } else {
    $(element).next('.error').remove();

    if (errorPlaceSelector) {
      $(errorPlaceSelector).html(getErrorMessage(pesan));
    } else {
      $(element).after(getErrorMessage(pesan));
    }

    $(element).closest('.form-control').addClass('is-invalid');
  }
}

/**
 * Menampilkan pesan error untuk elemen radio.
 * @param {HTMLElement} element - Elemen radio yang divalidasi.
 * @param {string} pesan - Pesan error yang akan ditampilkan.
 */
function validationRadio(element, pesan) {
  $(element).closest('.radio-group').find('.error').remove();
  $(element).closest('.radio-group').append(getErrorMessage(pesan));
  $(element).closest('.radio-group').addClass('is-invalid');
}

/**
 * Menampilkan pesan error untuk elemen input file.
 * @param {HTMLElement} element - Elemen input file yang divalidasi.
 * @param {string} pesan - Pesan error yang akan ditampilkan.
 */
function validationFile(element, pesan) {
  $(element).next('.error').remove();
  $(element).after(getErrorMessage(pesan));
  $(element).addClass('is-invalid');
}

/**
 * Menampilkan pesan error untuk elemen input checkbox.
 * @param {HTMLElement} element - Elemen input file yang divalidasi.
 * @param {string} pesan - Pesan error yang akan ditampilkan.
 */
function validationCheckbox(element, pesan) {
  const group = $(element).closest('.checkbox-group');
  group.find('.error').remove();
  group.append(getErrorMessage(pesan));
  group.addClass('is-invalid');
}

/**
 * Menghapus pesan error dari elemen input.
 * @param {HTMLElement} element - Elemen yang divalidasi.
 */
function validationCheckboxRemove(element) {
  $(element).closest('.checkbox-group').find('.error').remove();
  $(element).closest('.checkbox-group').removeClass('is-invalid');
}

/**
 * Menghapus pesan error dari elemen input.
 * @param {HTMLElement} element - Elemen yang divalidasi.
 */
function validationRemove(element) {
  const errorPlace = $(element).data('errorplace');

  if (errorPlace) {
    $(errorPlace).find('.error').remove();
  } else {
    $(element).next('.error').remove();
  }

  $(element).removeClass('is-invalid');
}

/**
 * Menghapus pesan error dari elemen select dan select2.
 * @param {HTMLElement} element - Elemen yang divalidasi.
 */
function validationSelectRemove(element) {
  const errorPlace = $(element).data('errorplace');

  if (errorPlace) {
    $(errorPlace).find('.error').remove();
  }

  if ($(element).hasClass('select2-hidden-accessible')) {
    $(element).next('.select2-container').next('.error').remove();

    $(element)
      .next()
      .find('.select2-selection')
      .parent()
      .removeClass('has-error');
  } else {
    $(element).next('.error').remove();
    $(element).closest('.form-control').removeClass('is-invalid');
  }
}

// VALIDATION REMOVE ================================================================================

/**
 * Menghapus pesan error dari elemen radio.
 * @param {HTMLElement} element - Elemen radio yang divalidasi.
 */
function validationRadioRemove(element) {
  const errorPlace = $(element).data('errorplace');

  if (errorPlace) {
    $(errorPlace).find('.error').remove();
  }

  $(element).closest('.radio-group').find('.error').remove();
  $(element).closest('.radio-group').removeClass('is-invalid');
}

/**
 * Menghapus pesan error dari elemen checkbox.
 * @param {HTMLElement} element - Elemen radio yang divalidasi.
 */
function validationCheckboxRemove(element) {
  const errorPlace = $(element).data('errorplace');

  if (errorPlace) {
    $(errorPlace).find('.error').remove();
  }

  $(element).closest('.checkbox-group').find('.error').remove();
  $(element).closest('.checkbox-group').removeClass('is-invalid');
}

/**
 * Menghapus pesan error dari elemen input file.
 * @param {HTMLElement} element - Elemen input file yang divalidasi.
 */
function validationFileRemove(element) {
  const errorPlace = $(element).data('errorplace');

  if (errorPlace) {
    $(errorPlace).find('.error').remove();
  }

  $(element).next('.error').remove();
  $(element).removeClass('is-invalid');
}

/**
 * Memeriksa apakah string adalah alamat email yang valid.
 * @param {string} email - Alamat email yang akan divalidasi.
 * @returns {boolean} - Mengembalikan true jika valid, false jika tidak.
 */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// VALIDATION ON CHANGE ================================================================================

/**
 * Melakukan validasi pada input teks saat terjadi perubahan.
 * @param {HTMLElement} element - Elemen input yang divalidasi.
 * @param {string} lang - Bahasa yang dipilih
 * @returns {boolean} - Mengembalikan true jika valid, false jika tidak.
 */
function validateOnInput(element, lang) {
  const value = $(element).val();
  const required = $(element).data('required');
  const minLength = $(element).data('minlength');
  const maxLength = $(element).data('maxlength');
  const isNumber = $(element).data('isnumber');
  const minValue = $(element).data('minvalue');
  const maxValue = $(element).data('maxvalue');
  const isEmail = $(element).data('email');
  const isAlphabetic = $(element).data('alphabetic');
  const specialChars = $(element).data('specialchar')
    ? $(element).data('specialchar').split(',')
    : [];

  validationRemove(element);

  const label = $(element).data('label') || 'Kolom ini'; // Ambil data-label jika ada
  const langMessages = messages[lang] || messages.id; // Ambil pesan berdasarkan bahasa

  if (required && value.trim() === '') {
    validation(element, langMessages.required.replace('{label}', label));
    return false;
  }

  if (minLength && value.length < minLength) {
    validation(
      element,
      langMessages.minlength
        .replace('{minLength}', minLength)
        .replace('{label}', label)
    );
    return false;
  }

  if (maxLength && value.length > maxLength) {
    validation(
      element,
      langMessages.maxlength
        .replace('{maxLength}', maxLength)
        .replace('{label}', label)
    );
    return false;
  }

  if (isAlphabetic && !/^[A-Za-z\s]+$/.test(value)) {
    validation(element, langMessages.alphabetic.replace('{label}', label));
    return false;
  }

  const specialCharText = specialChars.join(', ');
  for (const char of specialChars) {
    if (value.includes(char.trim())) {
      validation(
        element,
        langMessages.specialChar
          .replace('{specialChars}', specialCharText)
          .replace('{label}', label)
      );
      return false;
    }
  }

  if (isNumber && isNaN(value)) {
    validation(element, langMessages.number.replace('{label}', label));
    return false;
  }

  if (minValue && parseFloat(value) < minValue) {
    validation(
      element,
      langMessages.minValue
        .replace('{minValue}', minValue)
        .replace('{label}', label)
    );
    return false;
  }

  if (maxValue && parseFloat(value) > maxValue) {
    validation(
      element,
      langMessages.maxValue
        .replace('{maxValue}', maxValue)
        .replace('{label}', label)
    );
    return false;
  }

  if (isEmail && !validateEmail(value)) {
    validation(element, langMessages.email.replace('{label}', label));
    return false;
  }

  return true;
}

/**
 * Melakukan validasi pada elemen select dan select2.
 * @param {HTMLElement} element - Elemen select yang divalidasi.
 * @param {string} lang bahasa
 * @returns {boolean} - Mengembalikan true jika valid, false jika tidak.
 */
function validateOnSelect(element, lang) {
  const value = $(element).val();
  const required = $(element).data('required');
  const label = $(element).data('label') || 'Kolom ini'; // Ambil data-label jika ada
  const langMessages = messages[lang] || messages.id; // Ambil pesan berdasarkan bahasa

  // Hapus pesan kesalahan sebelumnya
  validationSelectRemove(element);

  // Validasi jika opsi wajib dipilih
  if (required && (value === null || value === '' || value.length === 0)) {
    validationSelect(element, langMessages.required.replace('{label}', label));
    return false;
  }

  return true;
}

/**
 * Melakukan validasi pada elemen radio.
 * @param {string} name - Nama grup radio yang divalidasi.
 * @returns {boolean} - Mengembalikan true jika valid, false jika tidak.
 */
function validateOnRadio(name, lang) {
  const isChecked = $(`input[name="${name}"]:checked`).length > 0;
  const required = $(`input[name="${name}"]`).data('required');
  const label = $(`input[name="${name}"]`).data('label') || 'Pilihan'; // Ambil data-label jika ada
  const langMessages = messages[lang] || messages.id; // Ambil pesan berdasarkan bahasa

  validationRadioRemove($(`input[name="${name}"]`));

  if (required && !isChecked) {
    validationRadio(
      $(`input[name="${name}"]`),
      langMessages.required.replace('{label}', label) // Menggunakan pesan bahasa
    );
    return false;
  }

  return true;
}

/**
 * Melakukan validasi pada elemen input file.
 * @param {HTMLElement} element - Elemen input file yang divalidasi.
 * @returns {boolean} - Mengembalikan true jika valid, false jika tidak.
 */
function validateOnFile(element, lang) {
  const required = $(element).data('required');
  const allowedExtensions = $(element).data('extfile');
  const typeSize = $(element).data('typesize') || 'mb';
  const sizeLimit = parseFloat($(element).data('size'));
  const file = $(element)[0].files[0];
  const label = $(element).data('label') || 'Unggah file'; // Ambil data-label jika ada
  const langMessages = messages[lang] || messages.id; // Ambil pesan berdasarkan bahasa

  validationRemove(element);

  if (required && !file) {
    validation(element, langMessages.required.replace('{label}', label)); // Menggunakan pesan bahasa
    return false;
  }

  if (file) {
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    const allowedExtensionArray = allowedExtensions.split(',');
    const allowedExntensionText = allowedExtensionArray.join(', ');

    if (!allowedExtensionArray.includes(fileExtension)) {
      validation(
        element,
        langMessages.extfile
          .replace('{allowedExtensions}', allowedExntensionText)
          .replace('{label}', label) // Pesan error untuk tipe file
      );
      return false;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    const fileSizeInKB = file.size / 1024;

    if (typeSize === 'mb' && fileSizeInMB > sizeLimit) {
      validation(
        element,
        langMessages.sizeMB
          .replace('{sizeLimit}', sizeLimit)
          .replace('{label}', label)
      ); // Pesan error untuk ukuran file dalam MB
      return false;
    }

    if (typeSize === 'kb' && fileSizeInKB > sizeLimit) {
      validation(
        element,
        langMessages.sizeKB
          .replace('{sizeLimit}', sizeLimit)
          .replace('{label}', label)
      ); // Pesan error untuk ukuran file dalam KB
      return false;
    }
  }

  return true;
}

/**
 * Melakukan validasi pada elemen input file.
 * @param {HTMLElement} element - Elemen input file yang divalidasi.
 * @returns {boolean} - Mengembalikan true jika valid, false jika tidak.
 * @param {string} lang bahasa
 */
function validateOnCheckbox(name, lang) {
  // Memilih elemen checkbox berdasarkan name yang diberikan
  const element = $(`input[name="${name}"]`);

  // Menghitung jumlah checkbox yang terpilih
  const selected = $(`input[name="${name}"]:checked`).length;

  // Mengambil data dari elemen checkbox
  const required = $(element).data('required');
  const minSelection = $(element).data('minselection');
  const maxSelection = $(element).data('maxselection');
  const label = $(element).data('label') || 'Kolom ini'; // Mengambil label atau menggunakan default
  const langMessages = messages[lang] || messages.id; // Mengambil pesan berdasarkan bahasa

  // Menghapus pesan kesalahan sebelumnya
  validationCheckboxRemove(element);

  // Validasi jika checkbox wajib dipilih
  if (required && selected === 0) {
    validationCheckbox(
      element,
      langMessages.required.replace('{label}', label)
    );
    return false;
  }

  // Validasi untuk jumlah minimum pilihan
  if (minSelection && selected < minSelection) {
    validationCheckbox(
      element,
      langMessages.minselection
        .replace('{minSelection}', minSelection)
        .replace('{label}', label)
    );
    return false;
  }

  // Validasi untuk jumlah maksimum pilihan
  if (maxSelection && selected > maxSelection) {
    validationCheckbox(
      element,
      langMessages.maxselection
        .replace('{maxSelection}', maxSelection)
        .replace('{label}', label)
    );
    return false;
  }

  return true;
}

/**
 * Menginisialisasi validasi input oninput untuk elemen dengan kelas 'validate'.
 * implementasi di script (bagian atas)
 * @param {*} setting
 */
function initValidationOnInput({ lang = 'id' } = {}) {
  currentLangValidation = lang;

  // Validasi teks
  $('.validate-text').on('input', function () {
    validateOnInput(this, currentLangValidation);
  });

  // Validasi select
  $('.validate-select').on('change', function () {
    validateOnSelect(this, currentLangValidation);
  });

  // Validasi radio
  $('.validate-radio').on('change', function () {
    validateOnRadio($(this).attr('name'), currentLangValidation);
  });

  // Validasi file
  $('.validate-file').on('change', function () {
    validateOnFile(this, currentLangValidation);
  });

  // validasi checkbox
  $('.validate-checkbox').on('change', function () {
    validateOnCheckbox(this, currentLangValidation);
  });
}

/**
 * Memeriksa validitas form sebelum disubmit.
 * implementasi di script
 * @returns {boolean} - Mengembalikan true jika form valid, false jika tidak.
 */
function isValidForm() {
  let isValid = true;

  $('.validate-text').each(function () {
    if (!validateOnInput(this, currentLangValidation)) {
      isValid = false;
    }
  });

  $('.validate-select').each(function () {
    if (!validateOnSelect(this, currentLangValidation)) {
      isValid = false;
    }
  });

  $('.validate-radio').each(function () {
    if (!validateOnRadio($(this).attr('name'), currentLangValidation)) {
      isValid = false;
    }
  });

  $('.validate-file').each(function () {
    if (
      $(this).data('required') &&
      !validateOnFile(this, currentLangValidation)
    ) {
      isValid = false;
    }
  });

  $('.validate-checkbox').each(function () {
    if (!validateOnCheckbox($(this).attr('name'), currentLangValidation)) {
      isValid = false;
    }
  });

  return isValid;
}

// HANDLE ERROR SERVER =============================================================================
function handleCodeIgniterError(data) {
  data.error_class.forEach((inputName, i) => {
    const errorMessage = data.error_string[i];
    const element = $(`[name="${inputName}"]`);

    if (element.hasClass('select2')) {
      const isMultiple = element.is('[multiple]');

      if (isMultiple) {
        validationSelect(`[name="${inputName}[]"]`, errorMessage);
      } else {
        validationSelect(`[name="${inputName}"]`, errorMessage);
      }
    } else if (element.attr('type') === 'radio') {
      validationRadio(`[name="${inputName}"]`, errorMessage);
    } else if (element.attr('type') === 'file') {
      validationFile(`[name="${inputName}"]`, errorMessage);
    } else {
      validation(`[name="${inputName}"]`, errorMessage);
    }
  });
}

function handleLaravelError(data) {
  Object.keys(data.errors).forEach(field => {
    const errorMessage = data.errors[field][0];
    const element = $(`[name="${field}"]`);

    if (element.hasClass('select2')) {
      const isMultiple = element.data('select2').options.options.multiple;
      console.log(isMultiple);

      if (isMultiple) {
        validationSelect(`[name="${field}[]"]`, errorMessage);
        console.log(`Validating multiple select: [name="${field}[]"]`);
      } else {
        validationSelect(`[name="${field}"]`, errorMessage);
      }
    } else if (element.attr('type') === 'radio') {
      validationRadio(`[name="${field}"]`, errorMessage);
    } else if (element.attr('type') === 'file') {
      validationFile(`[name="${field}"]`, errorMessage);
    } else {
      validation(`[name="${field}"]`, errorMessage);
    }
  });
}

function handleCodeIgniterErrorClass(data) {
  data.error_class.forEach((inputName, i) => {
    const errorMessage = data.error_string[i];
    const element = $(`.vl_${inputName}`);

    if (element.hasClass('select2')) {
      const isMultiple = element.is('[multiple]');

      if (isMultiple) {
        validationSelect(`[name="${inputName}[]"]`, errorMessage);
      } else {
        validationSelect(`[name="${inputName}"]`, errorMessage);
      }
    } else if (element.attr('type') === 'radio') {
      validationRadio(`[name="${inputName}"]`, errorMessage);
    } else if (element.attr('type') === 'file') {
      validationFile(`[name="${inputName}"]`, errorMessage);
    } else {
      validation(`[name="${inputName}"]`, errorMessage);
    }
  });
}

function handleLaravelErrorClass(data) {
  Object.keys(data.errors).forEach(field => {
    const errorMessage = data.errors[field][0];
    const element = $(`.vl_${field}`);

    if (element.hasClass('select2')) {
      const isMultiple = element.data('select2').options.options.multiple;

      if (isMultiple) {
        validationSelect(`[name="${field}[]"]`, errorMessage);
      } else {
        validationSelect(`[name="${field}"]`, errorMessage);
      }
    } else if (element.attr('type') === 'radio') {
      validationRadio(`[name="${field}"]`, errorMessage);
    } else if (element.attr('type') === 'file') {
      validationFile(`[name="${field}"]`, errorMessage);
    } else {
      validation(`[name="${field}"]`, errorMessage);
    }
  });
}
