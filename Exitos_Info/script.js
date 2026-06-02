document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');

    // Input Masks
    const cpfInput = document.getElementById('cpf');
    const phoneInput = document.getElementById('phone');

    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            // CPF Mask
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
            // CNPJ Mask (optional if they type more)
            value = value.substring(0, 14);
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }
        e.target.value = value;
    });

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 11);
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length > 0) {
            value = value.replace(/^(\d*)/, '($1');
        }
        e.target.value = value;
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulating API Call
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        btn.disabled = true;

        setTimeout(() => {
            // Clear form and show success
            form.reset();
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Restore button
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    });

    // Reset Form View
    resetBtn.addEventListener('click', () => {
        successMessage.classList.add('hidden');
        form.style.display = 'block';
        
        // Small animation
        form.style.animation = 'fadeIn 0.5s ease';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    });
});
