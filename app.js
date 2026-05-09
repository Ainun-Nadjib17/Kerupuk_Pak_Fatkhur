const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const scrolled = ref(false);
    const mobileOpen = ref(false);

    const navLinks = [
      { label: 'Beranda', href: '#hero' },
      { label: 'Tentang', href: '#tentang' },
      { label: 'Produk', href: '#produk' },
      { label: 'Testimoni', href: '#testimoni' },
      { label: 'Lokasi', href: '#lokasi' },
    ];

    const features = [
      { icon: 'fas fa-leaf', title: 'Bahan Alami', desc: '100% bawang asli pilihan' },
      { icon: 'fas fa-fire-flame-curved', title: 'Fresh Setiap Hari', desc: 'Digoreng pagi hari' },
      { icon: 'fas fa-hand-holding-heart', title: 'Harga Terjangkau', desc: 'Mulai Rp5.000 saja' },
      { icon: 'fas fa-truck', title: 'Bisa Kirim', desc: 'Pesan via WhatsApp' },
    ];

    const products = [
      {
        name: 'Kerupuk Porsian',
        desc: 'Cocok untuk lauk makan sehari-hari. Bebas pilih jumlah sesuai kebutuhan, mulai dari Rp5.000.',
        price: 'Rp5.000',
        unit: '/ porsi',
        img: 'assets/kerupuk_porsi.png',
        badge: 'Best Seller',
      },
      {
        name: 'Kerupuk Rentengan',
        desc: 'Satu renteng berisi beberapa bungkus kerupuk bawang. Pas untuk stok di rumah atau dijual lagi!',
        price: 'Rp25.000',
        unit: '/ renteng',
        img: 'assets/kerupuk_rentengan.png',
        badge: 'Hemat',
      },
      {
        name: 'Paket Oleh-Oleh',
        desc: 'Paket spesial untuk oleh-oleh. Dikemas rapi dan siap dibawa pulang sebagai buah tangan khas Pasuruan.',
        price: 'Rp50.000',
        unit: '/ paket',
        img: 'assets/kerupuk_hero.png',
        badge: null,
      },
    ];

    const testimonials = [
      { name: 'Bu Sari', initials: 'BS', role: 'Ibu Rumah Tangga', text: 'Kerupuknya renyah banget dan bawangnya kerasa. Anak-anak suka semua! Selalu beli tiap minggu di pasar.' },
      { name: 'Pak Hendra', initials: 'PH', role: 'Pedagang Nasi', text: 'Saya langganan sudah bertahun-tahun. Kualitasnya konsisten, pelanggan warung saya pada suka. Harga juga bersahabat.' },
      { name: 'Dina Ayu', initials: 'DA', role: 'Mahasiswi', text: 'Sering beli buat camilan di kos. Murah meriah tapi rasanya premium! Recommended banget buat yang suka kerupuk bawang.' },
    ];

    const locationInfo = [
      { icon: 'fas fa-map-marker-alt', title: 'Pasar Kebonagong', desc: 'Depan Senkuko, Kota Pasuruan, Jawa Timur' },
      { icon: 'fas fa-clock', title: 'Jam Buka', desc: 'Setiap hari, 06.00 - 11.00 WIB' },
      { icon: 'fas fa-phone', title: 'WhatsApp', desc: '0896-3558-0992' },
    ];

    // Scroll handler
    const handleScroll = () => {
      scrolled.value = window.scrollY > 50;
    };

    // Intersection Observer for scroll reveal (lazy load content)
    let observer = null;

    const initScrollReveal = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
      );

      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el) => {
        observer.observe(el);
      });
    };

    // Counter animation
    const animateCounters = () => {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const target = parseInt(el.getAttribute('data-target'));

              let current = 0;
              const step = Math.ceil(target / 60);
              const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                el.textContent = current + '+';
              }, 30);
              counterObserver.unobserve(el);
            }
          });
        },
        { threshold: 0.5 }
      );

      document.querySelectorAll('.counter').forEach((el) => {
        counterObserver.observe(el);
      });
    };

    // 3D tilt effect on mouse move for hero card
    const initTiltEffect = () => {
      const wrapper = document.querySelector('.hero-image-wrapper');
      if (!wrapper) return;
      const card = wrapper.querySelector('.hero-3d-card');

      wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
      });

      wrapper.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(-5deg) rotateX(5deg)';
      });
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll();

      // Wait for DOM to fully render then init animations
      setTimeout(() => {
        initScrollReveal();
        animateCounters();
        initTiltEffect();
      }, 100);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    });

    return {
      scrolled,
      mobileOpen,
      navLinks,
      features,
      products,
      testimonials,
      locationInfo,
    };
  },
}).mount('#app');
