// plugins/gatsby-plugin-multilingual/gatsby-node.js
const fs = require('fs');
const path = require('path');

// 多语言配置
const translations = {
    es: `---
template: service
language: es
title: "Sistema de Perspectivas de Ventas y Finanzas"
description: "A través de una contabilidad refinada y sistemas de cuentas multidimensionales, haga que cada entrada y salida de las actividades de ventas y marketing sea claramente visible, posicionando con precisión las fuentes de valor y los puntos de pérdida"
price: 8999
originalPrice: 11999
duration: "Servicio continuo"
category: "sales-finance"
features:
  - "Sistema de contabilidad de ganancias multidimensional"
  - "Análisis de eficiencia del embudo de ventas"
  - "Cálculo del valor de vida del cliente"
  - "Seguimiento del ROI de marketing"
  - "Pronóstico y optimización del flujo de caja"
  - "Generación automatizada de informes financieros"
process:
  - "Diagnóstico del estado actual: Analizar los sistemas de datos financieros y de ventas existentes"
  - "Diseño del sistema: Construir modelos de contabilidad multidimensional"
  - "Integración de datos: Conectar sistemas de ventas, finanzas y operaciones"
  - "Desarrollo de panel: Crear paneles de gestión visual"
  - "Capacitación del equipo: Métodos de uso del sistema y análisis de datos"
  - "Optimización continua: Ajustar sistemas según los cambios comerciales"
---`,

    fr: `---
template: service
language: fr
title: "Système d'Insights Ventes et Finances"
description: "Grâce à une comptabilité raffinée et des systèmes de comptes multidimensionnels, rendez chaque entrée et sortie des activités commerciales et marketing clairement visible, en positionnant avec précision les sources de valeur et les points de perte"
price: 8999
originalPrice: 11999
duration: "Service continu"
category: "sales-finance"
features:
  - "Système de comptabilité des bénéfices multidimensionnel"
  - "Analyse de l'efficacité de l'entonnoir de vente"
  - "Calcul de la valeur à vie du client"
  - "Suivi du ROI marketing"
  - "Prévision et optimisation des flux de trésorerie"
  - "Génération automatique de rapports financiers"
process:
  - "Diagnostic de l'état actuel : Analyser les systèmes de données financières et commerciales existants"
  - "Conception du système : Construire des modèles de comptabilité multidimensionnels"
  - "Intégration des données : Connecter les systèmes de vente, finance et opérations"
  - "Développement de tableau de bord : Créer des tableaux de bord de gestion visuelle"
  - "Formation de l'équipe : Méthodes d'utilisation du système et analyse des données"
  - "Optimisation continue : Ajuster les systèmes en fonction des changements commerciaux"
---`,

    de: `---
template: service
language: de
title: "Vertriebs- und Finanz-Insights-System"
description: "Durch verfeinerte Buchhaltung und mehrdimensionale Kontensysteme machen Sie jeden Input und Output von Vertriebs- und Marketingaktivitäten klar sichtbar und positionieren präzise Wertquellen und Verlustpunkte"
price: 8999
originalPrice: 11999
duration: "Laufender Service"
category: "sales-finance"
features:
  - "Mehrdimensionales Gewinnabrechnungssystem"
  - "Vertriebstrichter-Effizienzanalyse"
  - "Berechnung des Kundenlebenszeitwerts"
  - "Marketing-ROI-Verfolgung"
  - "Cashflow-Prognose und -Optimierung"
  - "Automatisierte Erstellung von Finanzberichten"
process:
  - "Ist-Zustandsdiagnose: Analyse bestehender Finanz- und Vertriebsdaten-Systeme"
  - "Systemdesign: Aufbau mehrdimensionaler Abrechnungsmodelle"
  - "Datenintegration: Verbindung von Vertriebs-, Finanz- und Betriebssystemen"
  - "Dashboard-Entwicklung: Erstellung visueller Management-Dashboards"
  - "Team-Schulung: Systemnutzungsmethoden und Datenanalyse"
  - "Kontinuierliche Optimierung: Anpassung der Systeme basierend auf Geschäftsänderungen"
---`,

    ja: `---
template: service
language: ja
title: "販売・財務インサイトシステム"
description: "洗練された会計処理と多次元アカウントシステムにより、販売・マーケティング活動のすべての投入と産出を明確に可視化し、価値の源泉と損失ポイントを正確に特定します"
price: 8999
originalPrice: 11999
duration: "継続サービス"
category: "sales-finance"
features:
  - "多次元利益計算システム"
  - "販売ファネル効率分析"
  - "顧客生涯価値計算"
  - "マーケティングROI追跡"
  - "キャッシュフロー予測と最適化"
  - "自動化された財務報告書生成"
process:
  - "現状診断：既存の財務・販売データシステムの分析"
  - "システム設計：多次元計算モデルの構築"
  - "データ統合：販売、財務、運用システムの接続"
  - "ダッシュボード開発：視覚的管理ダッシュボードの作成"
  - "チームトレーニング：システム使用方法とデータ分析"
  - "継続的最適化：ビジネス変化に基づくシステム調整"
---`,

    ko: `---
template: service
language: ko
title: "영업 및 재무 인사이트 시스템"
description: "정교한 회계 및 다차원 계정 시스템을 통해 영업 및 마케팅 활동의 모든 투입과 산출을 명확하게 가시화하고 가치 원천과 손실 지점을 정확하게 파악합니다"
price: 8999
originalPrice: 11999
duration: "지속 서비스"
category: "sales-finance"
features:
  - "다차원 이익 회계 시스템"
  - "영업 프넬 효율 분석"
  - "고객 생애 가치 계산"
  - "마케팅 ROI 추적"
  - "현금 흐름 예측 및 최적화"
  - "자동화된 재무 보고서 생성"
process:
  - "현황 진단: 기존 재무 및 영업 데이터 시스템 분석"
  - "시스템 설계: 다차원 회계 모델 구축"
  - "데이터 통합: 영업, 재무, 운영 시스템 연결"
  - "대시보드 개발: 시각적 관리 대시보드 생성"
  - "팀 교육: 시스템 사용 방법 및 데이터 분석"
  - "지속적 최적화: 비즈니스 변화에 따른 시스템 조정"
---`,

    ru: `---
template: service
language: ru
title: "Система аналитики продаж и финансов"
description: "Благодаря детализированному учету и многомерным системам счетов сделайте каждый ввод и вывод деятельности по продажам и маркетингу четко видимым, точно определяя источники стоимости и точки потерь"
price: 8999
originalPrice: 11999
duration: "Постоянное обслуживание"
category: "sales-finance"
features:
  - "Многомерная система учета прибыли"
  - "Анализ эффективности воронки продаж"
  - "Расчет пожизненной ценности клиента"
  - "Отслеживание ROI маркетинга"
  - "Прогнозирование и оптимизация денежного потока"
  - "Автоматическая генерация финансовых отчетов"
process:
  - "Диагностика текущего состояния: Анализ существующих систем финансовых и продажных данных"
  - "Проектирование системы: Построение многомерных учетных моделей"
  - "Интеграция данных: Подключение систем продаж, финансов и операций"
  - "Разработка панели управления: Создание визуальных панелей управления"
  - "Обучение команды: Методы использования системы и анализа данных"
  - "Постоянная оптимизация: Корректировка систем на основе изменений в бизнесе"
---`,

    ar: `---
template: service
language: ar
title: "نظام رؤى المبيعات والتمويل"
description: "من خلال المحاسبة الدقيقة وأنظمة الحسابات متعددة الأبعاد، اجعل كل مدخلات ومخرجات أنشطة المبيعات والتسويق مرئية بوضوح، مع تحديد مصادر القيمة ونقاط الخسارة بدقة"
price: 8999
originalPrice: 11999
duration: "خدمة مستمرة"
category: "sales-finance"
features:
  - "نظام محاسبة الأرباح متعدد الأبعاد"
  - "تحليل كفاءة قمع المبيعات"
  - "حساب قيمة العميل طوال العمر"
  - "تتبع عائد الاستثمار التسويقي"
  - "التنبؤ بالتدفق النقدي وتحسينه"
  - "إنشاء التقارير المالية الآلي"
process:
  - "تشخيص الحالة الحالية: تحليل أنظمة البيانات المالية والمبيعات الحالية"
  - "تصميم النظام: بناء نماذج محاسبة متعددة الأبعاد"
  - "دمج البيانات: ربط أنظمة المبيعات والتمويل والعمليات"
  - "تطوير لوحة التحكم: إنشاء لوحات إدارة مرئية"
  - "تدريب الفريق: طرق استخدام النظام وتحليل البيانات"
  - "التحسين المستمر: ضبط الأنظمة بناءً على التغييرات التجارية"
---`,

    pt: `---
template: service
language: pt
title: "Sistema de Insights de Vendas e Finanças"
description: "Através de contabilidade refinada e sistemas de contas multidimensionais, torne cada entrada e saída das atividades de vendas e marketing claramente visível, posicionando com precisão as fontes de valor e pontos de perda"
price: 8999
originalPrice: 11999
duration: "Serviço contínuo"
category: "sales-finance"
features:
  - "Sistema de contabilidade de lucros multidimensional"
  - "Análise de eficiência do funil de vendas"
  - "Cálculo do valor do tempo de vida do cliente"
  - "Acompanhamento do ROI de marketing"
  - "Previsão e otimização do fluxo de caixa"
  - "Geração automatizada de relatórios financeiros"
process:
  - "Diagnóstico do estado atual: Analisar sistemas existentes de dados financeiros e de vendas"
  - "Design do sistema: Construir modelos de contabilidade multidimensional"
  - "Integração de dados: Conectar sistemas de vendas, finanças e operações"
  - "Desenvolvimento de painel: Criar painéis de gestão visual"
  - "Treinamento da equipe: Métodos de uso do sistema e análise de dados"
  - "Otimização contínua: Ajustar sistemas com base em mudanças de negócios"
---`
,
    it: `---
template: service
language: it
title: "Sistema di Insight sulle Vendite e Finanze"
description: "Attraverso una contabilità raffinata e sistemi di conti multidimensionali, rendi ogni input e output delle attività di vendita e marketing chiaramente visibile, individuando con precisione le fonti di valore e i punti di perdita"
price: 8999
originalPrice: 11999
duration: "Servizio continuo"
category: "sales-finance"
features:
  - "Sistema di contabilità dei profitti multidimensionale"
  - "Analisi dell'efficienza dell'imbuto di vendita"
  - "Calcolo del valore del ciclo di vita del cliente"
  - "Monitoraggio del ROI del marketing"
  - "Previsione e ottimizzazione del flusso di cassa"
  - "Generazione automatizzata di report finanziari"
process:
  - "Diagnosi dello stato attuale: analizzare i sistemi di dati finanziari e di vendita esistenti"
  - "Progettazione del sistema: costruire modelli di contabilità multidimensionali"
  - "Integrazione dei dati: collegare sistemi di vendita, finanza e operazioni"
  - "Sviluppo dashboard: creare dashboard di gestione visiva"
  - "Formazione del team: metodi di utilizzo del sistema e analisi dei dati"
  - "Ottimizzazione continua: adeguare i sistemi in base ai cambiamenti aziendali"
---`,

    hi: `---
template: service
language: hi
title: "बिक्री और वित्तीय अंतर्दृष्टि प्रणाली"
description: "परिष्कृत लेखांकन और बहुआयामी खाता प्रणालियों के माध्यम से, बिक्री और विपणन गतिविधियों के प्रत्येक इनपुट और आउटपुट को स्पष्ट रूप से दृश्यमान बनाएं, मूल्य स्रोतों और हानि बिंदुओं को सटीक रूप से स्थिति दें"
price: 8999
originalPrice: 11999
duration: "निरंतर सेवा"
category: "sales-finance"
features:
  - "बहुआयामी लाभ लेखांकन प्रणाली"
  - "बिक्री फ़नल दक्षता विश्लेषण"
  - "ग्राहक जीवनकाल मूल्य गणना"
  - "विपणन आरओआई ट्रैकिंग"
  - "नकदी प्रवाह पूर्वानुमान और अनुकूलन"
  - "स्वचालित वित्तीय रिपोर्ट जनरेशन"
process:
  - "वर्तमान स्थिति निदान: मौजूदा वित्तीय और बिक्री डेटा प्रणालियों का विश्लेषण"
  - "सिस्टम डिजाइन: बहुआयामी लेखांकन मॉडल बनाएं"
  - "डेटा एकीकरण: बिक्री, वित्त, परिचालन प्रणालियों को कनेक्ट करें"
  - "डैशबोर्ड विकास: दृश्य प्रबंधन डैशबोर्ड बनाएं"
  - "टीम प्रशिक्षण: सिस्टम उपयोग विधियों और डेटा विश्लेषण"
  - "निरंतर अनुकूलन: व्यावसायिक परिवर्तनों के आधार पर सिस्टम समायोजित करें"
---`,

    bn: `---
template: service
language: bn
title: "বিক্রয় এবং আর্থিক অন্তর্দৃষ্টি সিস্টেম"
description: "পরিশীলিত অ্যাকাউন্টিং এবং বহুমাত্রিক অ্যাকাউন্ট সিস্টেমের মাধ্যমে, বিক্রয় এবং বিপণন কার্যক্রমের প্রতিটি ইনপুট এবং আউটপুট স্পষ্টভাবে দৃশ্যমান করুন, সঠিকভাবে মূল্য উত্স এবং ক্ষয়ক্ষতি পয়েন্ট স্থাপন করুন"
price: 8999
originalPrice: 11999
duration: "চলমান সেবা"
category: "sales-finance"
features:
  - "বহুমাত্রিক লাভ অ্যাকাউন্টিং সিস্টেম"
  - "বিক্রয় ফানেল দক্ষতা বিশ্লেষণ"
  - "গ্রাহক জীবনকাল মান গণনা"
  - "বিপণন ROI ট্র্যাকিং"
  - "নগদ প্রবাহ পূর্বাভাস এবং অপ্টিমাইজেশন"
  - "স্বয়ংক্রিয় আর্থিক প্রতিবেদন প্রজন্ম"
process:
  - "বর্তমান অবস্থা নির্ণয়: বিদ্যমান আর্থিক এবং বিক্রয় ডেটা সিস্টেম বিশ্লেষণ"
  - "সিস্টেম ডিজাইন: বহুমাত্রিক অ্যাকাউন্টিং মডেল তৈরি"
  - "ডেটা ইন্টিগ্রেশন: বিক্রয়, অর্থ, অপারেশন সিস্টেম সংযোগ"
  - "ড্যাশবোর্ড উন্নয়ন: ভিজ্যুয়াল ম্যানেজমেন্ট ড্যাশবোর্ড তৈরি"
  - "দল প্রশিক্ষণ: সিস্টেম ব্যবহার পদ্ধতি এবং ডেটা বিশ্লেষণ"
  - "ক্রমাগত অপ্টিমাইজেশন: ব্যবসায়িক পরিবর্তনের উপর ভিত্তি করে সিস্টেম সামঞ্জস্য"
---`,

    ur: `---
template: service
language: ur
title: "سیلز اور فنانشل ان سائٹس سسٹم"
description: "بہتر اکاؤنٹنگ اور کثیر جہتی اکاؤنٹ سسٹمز کے ذریعے، سیلز اور مارکیٹنگ سرگرمیوں کے ہر ان پٹ اور آؤٹ پٹ کو واضح طور پر نظر آنے والا بنائیں، قدر کے ذرائع اور نقصان کے نکات کو درستی سے پوزیشن دیں"
price: 8999
originalPrice: 11999
duration: "جاری خدمت"
category: "sales-finance"
features:
  - "کثیر جہتی منافع اکاؤنٹنگ سسٹم"
  - "سیلز فنل کی کارکردگی کا تجزیہ"
  - "کسٹمر لائف ٹائم ویلیو کیلکولیشن"
  - "مارکیٹنگ ROI ٹریکنگ"
  - "کیش فلو کی پیشن گوئی اور اصلاح"
  - "خودکار فنانشل رپورٹ جنریشن"
process:
  - "موجودہ حالت کی تشخیص: موجودہ فنانشل اور سیلز ڈیٹا سسٹمز کا تجزیہ"
  - "سسٹم ڈیزائن: کثیر جہتی اکاؤنٹنگ ماڈلز بنانا"
  - "ڈیٹا انٹیگریشن: سیلز، فنانس، آپریشنز سسٹمز کو جوڑنا"
  - ڈیش بورڈ ڈویلپمنٹ; بصری مینجمنٹ ڈیش بورڈز بنانا"
  - "ٹیم ٹریننگ: سسٹم استعمال کے طریقے اور ڈیٹا تجزیہ"
  - "مسلسل اصلاح: کاروباری تبدیلیوں کی بنیاد پر سسٹمز کو ایڈجسٹ کرنا"
---`,

    tr: `---
template: service
language: tr
title: "Satış ve Finansal İçgörü Sistemi"
description: "Gelişmiş muhasebe ve çok boyutlu hesap sistemleri aracılığıyla, satış ve pazarlama faaliyetlerinin her girdi ve çıktısını net bir şekilde görünür kılın, değer kaynaklarını ve kayıp noktalarını hassas bir şekilde konumlandırın"
price: 8999
originalPrice: 11999
duration: "Devam eden hizmet"
category: "sales-finance"
features:
  - "Çok boyutlu kar muhasebe sistemi"
  - "Satış hunisi verimlilik analizi"
  - "Müşteri yaşam boyu değer hesaplama"
  - "Pazarlama ROI takibi"
  - "Nakit akışı tahmini ve optimizasyonu"
  - "Otomatik finansal rapor oluşturma"
process:
  - "Mevcut durum teşhisi: Mevcut finans ve satış veri sistemlerini analiz edin"
  - "Sistem tasarımı: Çok boyutlu muhasebe modelleri oluşturun"
  - "Veri entegrasyonu: Satış, finans, operasyon sistemlerini bağlayın"
  - "Pano geliştirme: Görsel yönetim panoları oluşturun"
  - "Ekip eğitimi: Sistem kullanım yöntemleri ve veri analizi"
  - "Sürekli optimizasyon: İş değişikliklerine göre sistemleri ayarlayın"
---`,

    vi: `---
template: service
language: vi
title: "Hệ thống Thông tin Chi tiết về Bán hàng và Tài chính"
description: "Thông qua kế toán tinh vi và hệ thống tài khoản đa chiều, làm cho mọi đầu vào và đầu ra của hoạt động bán hàng và tiếp thị hiển thị rõ ràng, định vị chính xác các nguồn giá trị và điểm tổn thất"
price: 8999
originalPrice: 11999
duration: "Dịch vụ liên tục"
category: "sales-finance"
features:
  - "Hệ thống kế toán lợi nhuận đa chiều"
  - "Phân tích hiệu quả phễu bán hàng"
  - "Tính toán giá trị trọn đời của khách hàng"
  - "Theo dõi ROI tiếp thị"
  - "Dự báo và tối ưu hóa dòng tiền"
  - "Tạo báo cáo tài chính tự động"
process:
  - "Chẩn đoán hiện trạng: Phân tích hệ thống dữ liệu tài chính và bán hàng hiện có"
  - "Thiết kế hệ thống: Xây dựng mô hình kế toán đa chiều"
  - "Tích hợp dữ liệu: Kết nối hệ thống bán hàng, tài chính, vận hành"
  - "Phát triển bảng điều khiển: Tạo bảng điều khiển quản lý trực quan"
  - "Đào tạo nhóm: Phương pháp sử dụng hệ thống và phân tích dữ liệu"
  - "Tối ưu hóa liên tục: Điều chỉnh hệ thống dựa trên thay đổi kinh doanh"
---`,

    th: `---
template: service
language: th
title: "ระบบข้อมูลเชิงลึกด้านการขายและการเงิน"
description: "ผ่านระบบบัญชีที่ละเอียดและระบบบัญชีหลายมิติ ทำให้ทุกอินพุตและเอาต์พุตของกิจกรรมการขายและการตลาดมองเห็นได้ชัดเจน ระบุแหล่งที่มาของมูลค่าและจุดสูญเสียได้อย่างแม่นยำ"
price: 8999
originalPrice: 11999
duration: "บริการต่อเนื่อง"
category: "sales-finance"
features:
  - "ระบบบัญชีกำไรหลายมิติ"
  - "การวิเคราะห์ประสิทธิภาพของฟันnelขาย"
  - "การคำนวณมูลค่าตลอดชีพของลูกค้า"
  - "การติดตามผลตอบแทนจากการลงทุนทางการตลาด"
  - "การพยากรณ์และการเพิ่มประสิทธิภาพกระแสเงินสด"
  - "การสร้างรายงานทางการเงินอัตโนมัติ"
process:
  - "การวินิจฉัยสถานะปัจจุบัน: วิเคราะห์ระบบข้อมูลทางการเงินและการขายที่มีอยู่"
  - "การออกแบบระบบ: สร้างแบบจำลองบัญชีหลายมิติ"
  - "การรวมข้อมูล: เชื่อมต่อระบบการขาย การเงิน การดำเนินงาน"
  - "การพัฒนาแดชบอร์ด: สร้างแดชบอร์ดการจัดการแบบ可视"
  - "การฝึกอบรมทีม: วิธีการใช้ระบบและการวิเคราะห์ข้อมูล"
  - "การปรับปรุงอย่างต่อเนื่อง: ปรับระบบตามการเปลี่ยนแปลงทางธุรกิจ"
---`,

    fa: `---
template: service
language: fa
title: "سیستم بینش فروش و مالی"
description: "از طریق حسابداری تصفیه شده و سیستم های حساب چند بعدی، هر ورودی و خروجی فعالیت های فروش و بازاریابی را به وضوح قابل مشاهده کنید، منابع ارزش و نقاط از دست دادن را به طور دقیق موقعیت یابی کنید"
price: 8999
originalPrice: 11999
duration: "خدمت مستمر"
category: "sales-finance"
features:
  - "سیستم حسابداری سود چند بعدی"
  - "تجزیه و تحلیل کارایی قیف فروش"
  - "محاسبه ارزش طول عمر مشتری"
  - "ردیابی بازگشت سرمایه بازاریابی"
  - "پیش بینی و بهینه سازی جریان نقدی"
  - "تولید خودکار گزارش های مالی"
process:
  - "تشخیص وضعیت فعلی: تجزیه و تحلیل سیستم های داده مالی و فروش موجود"
  - "طراحی سیستم: ساخت مدل های حسابداری چند بعدی"
  - "ادغام داده ها: اتصال سیستم های فروش، مالی، عملیات"
  - "توسعه داشبورد: ایجاد داشبوردهای مدیریت بصری"
  - "آموزش تیم: روش های استفاده از سیستم و تجزیه و تحلیل داده ها"
  - "بهینه سازی مستمر: تنظیم سیستم ها بر اساس تغییرات تجاری"
---`,

    pl: `---
template: service
language: pl
title: "System Wglądów Sprzedażowych i Finansowych"
description: "Dzięki udoskonalonemu systemowi księgowemu i wielowymiarowym systemom kont, spraw aby każdy nakład i wynik działań sprzedażowych i marketingowych był wyraźnie widoczny, precyzyjnie lokalizując źródła wartości i punkty strat"
price: 8999
originalPrice: 11999
duration: "Usługa ciągła"
category: "sales-finance"
features:
  - "Wielowymiarowy system rozliczania zysków"
  - "Analiza efektywności lejka sprzedaży"
  - "Obliczanie wartości życiowej klienta"
  - "Śledzenie zwrotu z inwestycji marketingowych"
  - "Prognozowanie i optymalizacja przepływów pieniężnych"
  - "Automatyczne generowanie raportów finansowych"
process:
  - "Diagnoza stanu obecnego: Analiza istniejących systemów danych finansowych i sprzedażowych"
  - "Projekt systemu: Budowa wielowymiarowych modeli księgowych"
  - "Integracja danych: Łączenie systemów sprzedaży, finansów i operacji"
  - "Rozwój pulpitu nawigacyjnego: Tworzenie wizualnych pulpitów zarządzania"
  - "Szkolenie zespołu: Metody korzystania z systemu i analizy danych"
  - "Ciągła optymalizacja: Dostosowywanie systemów w oparciu o zmiany biznesowe"
---`,

    nl: `---
template: service
language: nl
title: "Systeem voor Verkoop- en Financiële Inzichten"
description: "Via verfijnde boekhouding en multidimensionale rekensystemen maak je elke input en output van verkoop- en marketingactiviteiten duidelijk zichtbaar, en positioneer je waardebronnen en verliespunten nauwkeurig"
price: 8999
originalPrice: 11999
duration: "Doorlopende dienst"
category: "sales-finance"
features:
  - "Multidimensionaal winstboekhoudsysteem"
  - "Efficiëntieanalyse verkooptrechter"
  - "Berekening klantlevensduurwaarde"
  - "Marketing ROI-tracking"
  - "Cashflowvoorspelling en -optimalisatie"
  - "Geautomatiseerde financiële rapportage"
process:
  - "Huidige staat diagnose: Analyse van bestaande financiële en verkoopgegevenssystemen"
  - "Systeemontwerp: Bouw multidimensionale boekhoudmodellen"
  - "Gegevensintegratie: Verbind verkoop-, financiële en operationele systemen"
  - "Dashboardontwikkeling: Creëer visuele managementdashboards"
  - "Teamtraining: Systeemgebruiksmethoden en gegevensanalyse"
  - "Continue optimalisatie: Pas systemen aan op basis van zakelijke veranderingen"
---`,

    sv: `---
template: service
language: sv
title: "System för Försäljnings- och Finansiella Insikter"
description: "Genom förfinad bokföring och flerdimensionella kontosystem gör du varje insats och resultat av försäljnings- och marknadsföringsaktiviteter tydligt synliga, och positionerar exakt värdekällor och förlustpunkter"
price: 8999
originalPrice: 11999
duration: "Pågående tjänst"
category: "sales-finance"
features:
  - "Flerdimensionellt vinstredovisningssystem"
  - "Effektivitetsanalys av försäljningstratt"
  - "Beräkning av kundens livstidsvärde"
  - "Marknadsförings ROI-spårning"
  - "Kassaflödesprognos och optimering"
  - "Automatiserad finansiell rapportgenerering"
process:
  - "Nuvarande tillståndsdiagnos: Analysera befintliga finansiella och försäljningsdatasystem"
  - "Systemdesign: Bygg flerdimensionella redovisningsmodeller"
  - "Dataintegration: Anslut försäljnings-, finans- och operationssystem"
  - "Dashboardutveckling: Skapa visuella management-dashboards"
  - "Teamträning: Systemanvändningsmetoder och dataanalys"
  - "Kontinuerlig optimering: Justera system baserat på affärsförändringar"
---`,

    da: `---
template: service
language: da
title: "System til Salgs- og Finansindsigter"
description: "Gennem forfinet regnskabsføring og multidimensionelle kontosystemer gør du hver input og output af salgs- og marketingaktiviteter klart synlige, og positionerer præcist værdikilder og tabspunkter"
price: 8999
originalPrice: 11999
duration: "Løbende service"
category: "sales-finance"
features:
  - "Multidimensionelt resultatregnskabssystem"
  - "Effektivitetsanalyse af salgstragt"
  - "Beregning af kundens levetidsværdi"
  - "Marketing ROI-sporing"
  - "Pengestrømsprognose og optimering"
  - "Automatiseret finansiel rapportgenerering"
process:
  - "Nuværende tilstandsdiagnose: Analyser eksisterende finansielle og salgsdatasystemer"
  - "Systemdesign: Byg multidimensionelle regnskabsmodeller"
  - "Dataintegration: Forbind salgs-, finans- og driftsystemer"
  - "Dashboardudvikling: Opret visuelle management-dashboards"
  - "Teamtræning: Systembrugsmetoder og dataanalyse"
  - "Kontinuerlig optimering: Juster systemer baseret på forretningsændringer"
---`,

    no: `---
template: service
language: no
title: "System for Salgs- og Finansinnsikter"
description: "Gjennom raffinert regnskap og flerdimensjonale kontosystemer gjør du hver innsats og resultat av salgs- og markedsføringsaktiviteter tydelig synlige, og posisjonerer nøyaktig verdikilder og tapspunkter"
price: 8999
originalPrice: 11999
duration: "Pågående tjeneste"
category: "sales-finance"
features:
  - "Flerdimensjonalt resultatregnskapssystem"
  - "Effektivitetsanalyse av salgstrakt"
  - "Beregning av kundens levetidsverdi"
  - "Markedsførings ROI-sporing"
  - "Kontantstrømprognose og optimering"
  - "Automatisert finansiell rapportgenerering"
process:
  - "Nåværende tilstandsdiagnose: Analyser eksisterende finansielle og salgsdatasystemer"
  - "Systemdesign: Bygg flerdimensjonale regnskapsmodeller"
  - "Dataintegrasjon: Koble salgs-, finans- og operasjonssystemer"
  - "Dashboardutvikling: Opprett visuelle management-dashboards"
  - "Teamtrening: Systembruksmetoder og dataanalyse"
  - "Kontinuerlig optimering: Juster systemer basert på forretningsendringer"
---`,

    fi: `---
template: service
language: fi
title: "Myynti- ja Rahoitusnäkymien Järjestelmä"
description: "Hienostuneen kirjanpidon ja moniulotteisten tilijärjestelmien kautta tee jokaisesta myynnin ja markkinoinnin toiminnan panoksesta ja tuloksesta selvästi näkyvän, asentaen tarkasti arvonlähteet ja tappiopisteet"
price: 8999
originalPrice: 11999
duration: "Jatkuva palvelu"
category: "sales-finance"
features:
  - "Moniulotteinen tuloksen kirjanpitojärjestelmä"
  - "Myynnin suppilon tehokkuusanalyysi"
  - "Asiakkaan elinkaariarvon laskenta"
  - "Markkinointi ROI-seuranta"
  - "Kassavirran ennustaminen ja optimointi"
  - "Automaattinen talousraporttien luonti"
process:
  - "Nykyisen tilan diagnosointi: Analysoi olemassa olevia talous- ja myyntitietojärjestelmiä"
  - "Järjestelmäsuunnittelu: Rakenna moniulotteisia kirjanpitomalleja"
  - "Tietojen integrointi: Yhdistä myynti-, rahoitus- ja toimintajärjestelmät"
  - "Kojetaulun kehittäminen: Luo visuaalisia hallintakojetauluja"
  - "Tiimin koulutus: Järjestelmän käyttömenetelmät ja tietojen analysointi"
  - "Jatkuva optimointi: Säädä järjestelmiä liiketoiminnan muutosten perusteella"
---`,

    cs: `---
template: service
language: cs
title: "Systém prodejních a finančních přehledů"
description: "Prostřednictvím rafinovaného účetnictví a vícerozměrných účtových systémů učinte každý vstup a výstup prodejních a marketingových aktivit jasně viditelným, přesně určujte zdroje hodnoty a body ztrát"
price: 8999
originalPrice: 11999
duration: "Průběžná služba"
category: "sales-finance"
features:
  - "Vícerozměrný systém účtování zisků"
  - "Analýza efektivity prodejního trychtýře"
  - "Výpočet hodnoty životního cyklu zákazníka"
  - "Sledování návratnosti marketingových investic"
  - "Předpověď a optimalizace cash flow"
  - "Automatizované generování finančních zpráv"
process:
  - "Diagnostika současného stavu: Analyzujte stávající finanční a prodejní datové systémy"
  - "Návrh systému: Vytvořte vícerozměrné účetní modely"
  - "Integrace dat: Propojte prodejní, finanční a provozní systémy"
  - "Vývoj řídicího panelu: Vytvořte vizuální řídicí panely"
  - "Školení týmu: Metody používání systému a analýzy dat"
  - "Průběžná optimalizace: Upravujte systémy na základě obchodních změn"
---`
,
    it: `---
template: service
language: it
title: "Sistema di Insight di Vendite e Finanza"
description: "Attraverso una contabilità raffinata e sistemi di conti multidimensionali, rendi ogni input e output delle attività di vendita e marketing chiaramente visibile, posizionando con precisione le fonti di valore e i punti di perdita"
price: 8999
originalPrice: 11999
duration: "Servizio continuo"
category: "sales-finance"
features:
  - "Sistema di contabilità dei profitti multidimensionale"
  - "Analisi dell'efficienza dell'imbuto di vendita"
  - "Calcolo del valore del ciclo di vita del cliente"
  - "Monitoraggio del ROI del marketing"
  - "Previsione e ottimizzazione del flusso di cassa"
  - "Generazione automatizzata di report finanziari"
process:
  - "Diagnosi dello stato attuale: Analizzare i sistemi di dati finanziari e di vendita esistenti"
  - "Progettazione del sistema: Costruire modelli di contabilità multidimensionali"
  - "Integrazione dei dati: Collegare sistemi di vendita, finanza e operazioni"
  - "Sviluppo del dashboard: Creare dashboard di gestione visiva"
  - "Formazione del team: Metodi di utilizzo del sistema e analisi dei dati"
  - "Ottimizzazione continua: Adeguare i sistemi in base ai cambiamenti aziendali"
---`,

    hi: `---
template: service
language: hi
title: "बिक्री और वित्तीय अंतर्दृष्टि प्रणाली"
description: "परिष्कृत लेखांकन और बहुआयामी खाता प्रणालियों के माध्यम से, बिक्री और विपणन गतिविधियों के प्रत्येक इनपुट और आउटपुट को स्पष्ट रूप से दृश्यमान बनाएं, मूल्य स्रोतों और हानि बिंदुओं को सटीक रूप से स्थिति में लाएं"
price: 8999
originalPrice: 11999
duration: "निरंतर सेवा"
category: "sales-finance"
features:
  - "बहुआयामी लाभ लेखांकन प्रणाली"
  - "बिक्री फ़नल दक्षता विश्लेषण"
  - "ग्राहक जीवनकाल मूल्य गणना"
  - "विपणन आरओआई ट्रैकिंग"
  - "नकदी प्रवाह पूर्वानुमान और अनुकूलन"
  - "स्वचालित वित्तीय रिपोर्ट जनरेशन"
process:
  - "वर्तमान स्थिति निदान: मौजूदा वित्तीय और बिक्री डेटा सिस्टम का विश्लेषण"
  - "सिस्टम डिजाइन: बहुआयामी लेखांकन मॉडल बनाएं"
  - "डेटा एकीकरण: बिक्री, वित्त, परिचालन सिस्टम कनेक्ट करें"
  - "डैशबोर्ड विकास: विज़ुअल मैनेजमेंट डैशबोर्ड बनाएं"
  - "टीम प्रशिक्षण: सिस्टम उपयोग विधियों और डेटा विश्लेषण"
  - "निरंतर अनुकूलन: व्यावसायिक परिवर्तनों के आधार पर सिस्टम समायोजित करें"
---`,

    bn: `---
template: service
language: bn
title: "বিক্রয় এবং আর্থিক অন্তর্দৃষ্টি সিস্টেম"
description: "পরিশীলিত অ্যাকাউন্টিং এবং বহুমাত্রিক অ্যাকাউন্ট সিস্টেমের মাধ্যমে, বিক্রয় এবং বিপণন কার্যক্রমের প্রতিটি ইনপুট এবং আউটপুট স্পষ্টভাবে দৃশ্যমান করুন, সঠিকভাবে মূল্য উৎস এবং ক্ষয়বিন্দু অবস্থান নির্ধারণ করুন"
price: 8999
originalPrice: 11999
duration: "অব্যাহত সেবা"
category: "sales-finance"
features:
  - "বহুমাত্রিক লাভ অ্যাকাউন্টিং সিস্টেম"
  - "বিক্রয় ফানেল দক্ষতা বিশ্লেষণ"
  - "গ্রাহক জীবনকাল মূল্য গণনা"
  - "বিপণন ROI ট্র্যাকিং"
  - "নগদ প্রবাহ পূর্বাভাস এবং অপ্টিমাইজেশন"
  - "স্বয়ংক্রিয় আর্থিক রিপোর্ট জেনারেশন"
process:
  - "বর্তমান অবস্থা নির্ণয়: বিদ্যমান আর্থিক এবং বিক্রয় ডেটা সিস্টেম বিশ্লেষণ"
  - "সিস্টেম ডিজাইন: বহুমাত্রিক অ্যাকাউন্টিং মডেল তৈরি করুন"
  - "ডেটা ইন্টিগ্রেশন: বিক্রয়, অর্থ, অপারেশন সিস্টেম সংযোগ করুন"
  - "ড্যাশবোর্ড উন্নয়ন: ভিজ্যুয়াল ম্যানেজমেন্ট ড্যাশবোর্ড তৈরি করুন"
  - "দলগত প্রশিক্ষণ: সিস্টেম ব্যবহার পদ্ধতি এবং ডেটা বিশ্লেষণ"
  - "অব্যাহত অপ্টিমাইজেশন: ব্যবসায়িক পরিবর্তনের উপর ভিত্তি করে সিস্টেম সামঞ্জস্য করুন"
---`,

    ur: `---
template: service
language: ur
title: "سیلز اور فنانشل ان سائٹس سسٹم"
description: "بہتر اکاؤنٹنگ اور کثیر جہتی اکاؤنٹ سسٹمز کے ذریعے، سیلز اور مارکیٹنگ سرگرمیوں کے ہر ان پٹ اور آؤٹ پٹ کو واضح طور پر نظر آنے والا بنائیں، قدر کے ذرائع اور نقصان کے نکات کو درستی سے پوزیشن دیں"
price: 8999
originalPrice: 11999
duration: "مسلسل سروس"
category: "sales-finance"
features:
  - "کثیر جہتی منافع اکاؤنٹنگ سسٹم"
  - "سیلز فنل کی کارکردگی کا تجزیہ"
  - "کسٹمر لائف ٹائم ویلیو کیلکولیشن"
  - "مارکیٹنگ ROI ٹریکنگ"
  - "کیش فلو فورکاسٹنگ اور آپٹیمائزیشن"
  - "آٹومیٹڈ فنانشل رپورٹ جنریشن"
process:
  - "موجودہ حالت کی تشخیص: موجودہ فنانشل اور سیلز ڈیٹا سسٹمز کا تجزیہ کریں"
  - "سسٹم ڈیزائن: کثیر جہتی اکاؤنٹنگ ماڈلز بنائیں"
  - "ڈیٹا انٹیگریشن: سیلز، فنانس، آپریشنز سسٹمز کو مربوط کریں"
  - ڈیش بورڈ ڈویلپمنٹ; بصری مینجمنٹ ڈیش بورڈز بنائیں"
  - "ٹیم ٹریننگ: سسٹم استعمال کے طریقے اور ڈیٹا تجزیہ"
  - "مسلسل آپٹیمائزیشن: کاروباری تبدیلیوں کی بنیاد پر سسٹمز کو ایڈجسٹ کریں"
---`,

    tr: `---
template: service
language: tr
title: "Satış ve Finansal İçgörü Sistemi"
description: "Gelişmiş muhasebe ve çok boyutlu hesap sistemleri aracılığıyla, satış ve pazarlama faaliyetlerinin her girdi ve çıktısını net bir şekilde görünür kılın, değer kaynaklarını ve kayıp noktalarını hassas bir şekilde konumlandırın"
price: 8999
originalPrice: 11999
duration: "Devam eden hizmet"
category: "sales-finance"
features:
  - "Çok boyutlu kar muhasebe sistemi"
  - "Satış hunisi verimlilik analizi"
  - "Müşteri yaşam boyu değer hesaplama"
  - "Pazarlama ROI takibi"
  - "Nakit akışı tahmini ve optimizasyonu"
  - "Otomatik finansal rapor oluşturma"
process:
  - "Mevcut durum teşhisi: Mevcut finansal ve satış veri sistemlerini analiz edin"
  - "Sistem tasarımı: Çok boyutlu muhasebe modelleri oluşturun"
  - "Veri entegrasyonu: Satış, finans, operasyon sistemlerini bağlayın"
  - "Pano geliştirme: Görsel yönetim panoları oluşturun"
  - "Ekip eğitimi: Sistem kullanım yöntemleri ve veri analizi"
  - "Sürekli optimizasyon: İş değişikliklerine dayalı sistem ayarlamaları"
---`,

    vi: `---
template: service
language: vi
title: "Hệ thống Thông tin chi tiết về Bán hàng và Tài chính"
description: "Thông qua kế toán tinh chế và hệ thống tài khoản đa chiều, làm cho mọi đầu vào và đầu ra của hoạt động bán hàng và tiếp thị hiển thị rõ ràng, định vị chính xác các nguồn giá trị và điểm tổn thất"
price: 8999
originalPrice: 11999
duration: "Dịch vụ liên tục"
category: "sales-finance"
features:
  - "Hệ thống kế toán lợi nhuận đa chiều"
  - "Phân tích hiệu quả phễu bán hàng"
  - "Tính toán giá trị trọn đời của khách hàng"
  - "Theo dõi ROI tiếp thị"
  - "Dự báo và tối ưu hóa dòng tiền"
  - "Tạo báo cáo tài chính tự động"
process:
  - "Chẩn đoán hiện trạng: Phân tích hệ thống dữ liệu tài chính và bán hàng hiện có"
  - "Thiết kế hệ thống: Xây dựng mô hình kế toán đa chiều"
  - "Tích hợp dữ liệu: Kết nối hệ thống bán hàng, tài chính, vận hành"
  - "Phát triển bảng điều khiển: Tạo bảng quản lý trực quan"
  - "Đào tạo nhóm: Phương pháp sử dụng hệ thống và phân tích dữ liệu"
  - "Tối ưu hóa liên tục: Điều chỉnh hệ thống dựa trên thay đổi kinh doanh"
---`,

    th: `---
template: service
language: th
title: "ระบบข้อมูลเชิงลึกด้านการขายและการเงิน"
description: "ผ่านระบบบัญชีที่ละเอียดและระบบบัญชีหลายมิติ ทำให้ทุกปัจจัยนำเข้าและผลลัพธ์ของกิจกรรมการขายและการตลาดมองเห็นได้ชัดเจน กำหนดตำแหน่งแหล่งที่มาของมูลค่าและจุดสูญเสียอย่างแม่นยำ"
price: 8999
originalPrice: 11999
duration: "บริการต่อเนื่อง"
category: "sales-finance"
features:
  - "ระบบบัญชีกำไรหลายมิติ"
  - "การวิเคราะห์ประสิทธิภาพกรวยการขาย"
  - "การคำนวณมูลค่าตลอดอายุลูกค้า"
  - "การติดตามผลตอบแทนจากการลงทุนทางการตลาด"
  - "การพยากรณ์และปรับ优化กระแสเงินสด"
  - "การสร้างรายงานทางการเงินอัตโนมัติ"
process:
  - "การวินิจฉัยสถานะปัจจุบัน: วิเคราะห์ระบบข้อมูลทางการเงินและการขายที่มีอยู่"
  - "การออกแบบระบบ: สร้างแบบจำลองบัญชีหลายมิติ"
  - "การรวมข้อมูล: เชื่อมต่อระบบการขาย การเงิน การดำเนินงาน"
  - "การพัฒนาแดชบอร์ด: สร้างแดชบอร์ดการจัดการแบบ可视化"
  - "การฝึกอบรมทีม: วิธีการใช้ระบบและการวิเคราะห์ข้อมูล"
  - "การปรับ优化อย่างต่อเนื่อง: ปรับระบบตามการเปลี่ยนแปลงทางธุรกิจ"
---`,

    fa: `---
template: service
language: fa
title: "سیستم بینش فروش و مالی"
description: "از طریق حسابداری تصفیه شده و سیستم های حساب چند بعدی، هر ورودی و خروجی فعالیت های فروش و بازاریابی را به وضوح قابل مشاهده کنید، منابع ارزش و نقاط اتلاف را به طور دقیق موقعیت یابی کنید"
price: 8999
originalPrice: 11999
duration: "خدمت مستمر"
category: "sales-finance"
features:
  - "سیستم حسابداری سود چند بعدی"
  - "تجزیه و تحلیل کارایی قیف فروش"
  - "محاسبه ارزش طول عمر مشتری"
  - "ردیابی بازگشت سرمایه بازاریابی"
  - "پیش بینی و بهینه سازی جریان نقدی"
  - "تولید خودکار گزارش های مالی"
process:
  - "تشخیص وضعیت فعلی: تجزیه و تحلیل سیستم های داده مالی و فروش موجود"
  - "طراحی سیستم: ساخت مدل های حسابداری چند بعدی"
  - "یکپارچه سازی داده: اتصال سیستم های فروش، مالی، عملیات"
  - "توسعه داشبورد: ایجاد داشبوردهای مدیریت بصری"
  - "آموزش تیم: روش های استفاده از سیستم و تجزیه و تحلیل داده"
  - "بهینه سازی مستمر: تنظیم سیستم ها بر اساس تغییرات کسب و کار"
---`,

    pl: `---
template: service
language: pl
title: "System Wglądów Sprzedażowych i Finansowych"
description: "Dzięki udoskonalonemu systemowi księgowemu i wielowymiarowym systemom kont, spraw aby każdy wkład i wynik działań sprzedażowych i marketingowych był wyraźnie widoczny, precyzyjnie lokalizując źródła wartości i punkty strat"
price: 8999
originalPrice: 11999
duration: "Usługa ciągła"
category: "sales-finance"
features:
  - "Wielowymiarowy system rozliczania zysków"
  - "Analiza efektywności lejka sprzedaży"
  - "Obliczanie wartości życiowej klienta"
  - "Śledzenie zwrotu z inwestycji marketingowych"
  - "Prognozowanie i optymalizacja przepływów pieniężnych"
  - "Automatyczne generowanie raportów finansowych"
process:
  - "Diagnoza stanu obecnego: Analiza istniejących systemów danych finansowych i sprzedażowych"
  - "Projekt systemu: Budowa wielowymiarowych modeli księgowych"
  - "Integracja danych: Łączenie systemów sprzedaży, finansów, operacji"
  - "Rozwój pulpitu nawigacyjnego: Tworzenie wizualnych pulpitów zarządzania"
  - "Szkolenie zespołu: Metody korzystania z systemu i analizy danych"
  - "Ciągła optymalizacja: Dostosowywanie systemów na podstawie zmian biznesowych"
---`,

    nl: `---
template: service
language: nl
title: "Systeem voor Verkoop- en Financiële Inzichten"
description: "Via verfijnde accounting en multidimensionale accountsystemen maak je elke input en output van verkoop- en marketingactiviteiten duidelijk zichtbaar, en positioneer je waardebronnen en verliespunten nauwkeurig"
price: 8999
originalPrice: 11999
duration: "Doorlopende service"
category: "sales-finance"
features:
  - "Multidimensionaal winstaccountingsysteem"
  - "Efficiëntieanalyse verkooptrechter"
  - "Berekening klantlevensduurwaarde"
  - "Marketing ROI-tracking"
  - "Cashflowvoorspelling en -optimalisatie"
  - "Geautomatiseerde financiële rapportage"
process:
  - "Huidige staat diagnose: Analyseer bestaande financiële en verkoopdatasystemen"
  - "Systeemontwerp: Bouw multidimensionale accountingmodellen"
  - "Data-integratie: Verbind verkoop-, financiële en operationsystemen"
  - "Dashboardontwikkeling: Creëer visuele managementdashboards"
  - "Teamtraining: Systeemgebruiksmethoden en data-analyse"
  - "Continue optimalisatie: Pas systemen aan op basis van zakelijke veranderingen"
---`
,
        ff: `---
template: service
language: ff
title: "Sistem Hoolaade Jaɓɓorgo e Caɗeele"
description: "Nde e kuutoragol hisaabuji kuuɗe e sistemi hisaabuji kese ɗiɗi, waɗ kala naatgol e yaatgol golle jaɓɓorgo e marget ɗin ɓanngeteede, fijirde caggal ɗow ngol njiɗaaji nji'ildu e nokkuuji ɓurtingol"
price: 8999
originalPrice: 11999
duration: "Ballal cuuɗal"
category: "sales-finance"
features:
  - "Sistem hisaabuji nji'ildu kese ɗiɗi"
  - "Yiytorde tawa e funnel jaɓɓorgo"
  - "Hisnude nji'ilaade jaɓɓotooɗo hakkunde ndeenaku"
  - "Jokkol relu marget"
  - "Fijirde e ɓeydude yaɓgol haraji"
  - "Sewnude rapoorji caɗeele toowɗe"
process:
  - "Yiytorde ngun woni jooni: Yiytor sistemi data caɗeele e jaɓɓorgo ɗeeɗo"
  - "Desine sistem: Maaje modeli hisaabuji kese ɗiɗi"
  - "Yokkugol data: Seŋor sistemi jaɓɓorgo, caɗeele, golle"
  - "Ɓeydude dashboard: Maaje dashboardi yiytorde gisal"
  - "Jangirde koreeji: Laabi kuutoragol sistem e yiytorde data"
  - "Ɓeydude cuuɗal: Waylu sistemi ɗemngal baylal gollal"
---`,

        la: `---
template: service
language: la
title: "Systema Prospectus Venditionis et Oeconomicorum"
description: "Per rationem accuratam et systemata rationum multidimensionalium, omnem input et output actionum venditionis et mercaturae clarum visibile facite, fontes valoris et puncta damni accurate collocantes"
price: 8999
originalPrice: 11999
duration: "Servitium continuum"
category: "sales-finance"
features:
  - "Systema rationis lucri multidimensionalis"
  - "Analysis efficentiae infundibuli venditionis"
  - "Calculatio valoris per vitae spatium clientis"
  - "Investigatio ROI mercaturae"
  - "Praedictio et optimizatio fluxus pecuniae"
  - "Generatio automatica relationum oeconomicorum"
process:
  - "Diagnosis status praesentis: Analyzare systemata datarum oeconomicarum et venditionis existentia"
  - "Designatio systematis: Aedificare exemplaria rationis multidimensionalis"
  - "Integratio datarum: Connectere systemata venditionis, oeconomicorum, operationum"
  - "Development tabularii: Creare tabularia gubernationis visualis"
  - "Exercitatio turmae: Methodi usus systematis et analysis datarum"
  - "Optimizatio continua: Adaptare systemata secundum mutationes negotiorum"
---`,

        grc: `---
template: service
language: grc
title: "Σύστημα Ενόρασης Πωλήσεων καὶ Οἰκονομικῶν"
description: "Διὰ λογιστικῆς ἀκριβοῦς καὶ συστημάτων λογαριασμῶν πολυδιάστατων, ποίει πᾶσαν εἰσροὴν καὶ ἐκροὴν ἐνεργειῶν πωλήσεων καὶ ἐμπορίας σαφῶς ὁρατήν, ἀκριβῶς θεμελιῶντας πηγές ἀξίας καὶ σημεία ἀπωλειῶν"
price: 8999
originalPrice: 11999
duration: "Διαρκὴς ὑπηρεσία"
category: "sales-finance"
features:
  - "Πολυδιάστατο σύστημα λογαριασμῶν κέρδους"
  - "Ἀνάλυσης ἀποτελεσματικότητας χώνης πωλήσεων"
  - "Λογισμὸς αἰωνίας ἀξίας πελάτου"
  - "Ἀνίχνευσης ἐπενδύσεως ἐμπορίας"
  - "Πρόβλεψις καὶ βελτιστοποίησης ῥοῆς μετρητῶν"
  - "Αὐτόματη δημιουργία οἰκονομικῶν ἀναφορῶν"
process:
  - "Διάγνωσις παρούσης καταστάσεως: Ἀναλύειν ὑπάρχοντα οἰκονομικὰ καὶ πωλήσεων συστήματα δεδομένων"
  - "Σχεδιασμὸς συστήματος: Οἰκοδομεῖν πολυδιάστατα μοντέλα λογιστικῆς"
  - "Ἑνσωμάτωσις δεδομένων: Συνδέειν συστήματα πωλήσεων, οἰκονομικῶν, ἐργασιῶν"
  - "Ἀνάπτυξις πίνακα ἐλέγχου: Δημιουργεῖν ὁπτικοὺς πίνακας διοικήσεως"
  - "Εκπαίδευσις ὁμάδος: Μέθοδοι χρήσεως συστήματος καὶ ἀναλύσεως δεδομένων"
  - "Συνεχὴς βελτιστοποίησις: Προσαρμόζειν συστήματα βασιζόμενα ἐπὶ ἐμπορικῶν ἀλλαγῶν"
---`
}







// 创建语言文件夹和文件
function createLanguageFiles() {
    Object.entries(translations).forEach(([lang, content]) => {
        const langDir = path.join(__dirname,'..', '..', 'content', lang, 'services');

        // 创建目录
        if (!fs.existsSync(langDir)) {
            fs.mkdirSync(langDir, { recursive: true });
            console.log(`创建目录: ${langDir}`);
        }

        // 创建文件
        const filePath = path.join(langDir, 'sales-finance.md');
        fs.writeFileSync(filePath, content);
        console.log(`创建文件: ${filePath}`);
    });
}
createLanguageFiles();
console.log('所有语言文件创建完成！');
