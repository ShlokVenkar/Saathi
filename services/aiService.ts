import { DocumentAnalysisResult, Language } from '@/types';

export interface SampleDocPreset {
  id: string;
  nameKey: string;
  defaultTitle: string;
  category: 'medical' | 'pension' | 'utility';
  rawText: string;
}

export const SAMPLE_DOCUMENTS: SampleDocPreset[] = [
  {
    id: 'sample-rx-1',
    nameKey: 'explainer.sampleMedical',
    defaultTitle: 'Dr. Kulkarni Clinic - Blood Pressure & Diabetes Prescription',
    category: 'medical',
    rawText: `DR. ANANT KULKARNI, MD (Medicine), Reg: MMC-74829
Kothrud, Pune - 411038
Date: 28th August 2026

PATIENT: Raj Sharma, Male, Age: 74 Yrs
Diagnosis: Essential Hypertension Stage 2, Mild Osteoarthritis

PRESCRIPTION:
1. Tab. Telmisartan 40mg (Brand: Telma 40) - 1 tablet daily MORNING after breakfast. (Continue 30 days)
2. Tab. Amlodipine 5mg (Brand: Amlokind 5) - 1 tablet daily NIGHT before bed.
3. Tab. Calcium + Vitamin D3 (Brand: Shelcal 500) - 1 tablet afternoon after lunch.
4. Gel. Diclofenac (Brand: Volini) - Apply on both knee joints twice daily as needed for pain.

ADVICE / INSTRUCTIONS:
- Low sodium salt intake (less than 1 tsp per day).
- Daily 20 min morning gentle walking.
- Fasting Blood Sugar & Serum Creatinine test scheduled on 15th September 2026.
- Next follow-up visit: 18th September 2026.`
  },
  {
    id: 'sample-pension-2',
    nameKey: 'explainer.samplePension',
    defaultTitle: 'Govt Pensioners Life Certificate (Jeevan Pramaan) Notice',
    category: 'pension',
    rawText: `GOVERNMENT OF MAHARASHTRA
Department of Treasuries and Accounts - Pune Central Division
Ref: PEN/PUNE/2026/88412

TO: Mr. Raj Sharma, PPO No: 7129004821
Subject: Submission of Annual Digital Life Certificate (Jeevan Pramaan) for FY 2026-27

Dear Pensioner,
This is an annual notification regarding continuation of your state government monthly retirement pension (Rs. 24,500/month).

MANDATORY ACTIONS REQUIRED:
1. You must submit your Digital Life Certificate (Jeevan Pramaan Patra) either online via face authentication app or by visiting your nearest Citizen Service Centre (CSC) or SBI Kothrud Branch.
2. DEADLINE: 30th November 2026.
3. Please carry your Aadhaar card and PPO pension passbook.
4. Failure to submit before 30th November will result in temporary suspension of pension credit starting December 2026.
5. For door-step assisted biometric service, call toll-free helpline 1800-180-1111.`
  },
  {
    id: 'sample-bill-3',
    nameKey: 'explainer.sampleBill',
    defaultTitle: 'MSEDCL Maharashtra Electricity Distribution Bill',
    category: 'utility',
    rawText: `MAHARASHTRA STATE ELECTRICITY DISTRIBUTION CO. LTD. (MSEDCL)
Consumer No: 021584930129 | Billing Cycle: Aug 2026
Name: Raj Sharma | Address: Flat 4, Shubham Apt, Kothrud, Pune

BILL SUMMARY:
Units Consumed: 142 kWh (Normal domestic tier)
Current Energy Charges: Rs. 1,120.00
Fixed & Wheeling Charges: Rs. 240.00
Govt Electricity Duty & Taxes: Rs. 188.00
Total Amount Payable: Rs. 1,548.00

IMPORTANT DATES:
- Bill Generation Date: 20 Aug 2026
- Due Date (Prompt Payment Discount Rs. 25): 05 Sep 2026
- Final Due Date without late fee: 10 Sep 2026
- Disconnection Notice Date: 25 Sep 2026 if unpaid.`
  }
];

class AIService {
  public async analyzeDocument(text: string, language: Language = 'en', docName: string = 'Uploaded Document'): Promise<DocumentAnalysisResult> {
    // Simulate brief network latency for realistic UX
    await new Promise((r) => setTimeout(r, 900));

    const isMedical = text.toLowerCase().includes('prescription') || text.toLowerCase().includes('tab.') || text.toLowerCase().includes('doctor') || text.toLowerCase().includes('patient');
    const isPension = text.toLowerCase().includes('pension') || text.toLowerCase().includes('jeevan pramaan') || text.toLowerCase().includes('ppo');
    const isBill = text.toLowerCase().includes('bill') || text.toLowerCase().includes('units') || text.toLowerCase().includes('msedcl') || text.toLowerCase().includes('amount');

    if (language === 'mr') {
      if (isMedical) {
        return {
          id: `doc-${Date.now()}`,
          fileName: docName,
          documentType: 'वैद्यकीय औषध चिठ्ठी (Medical Prescription)',
          summary: 'ही डॉ. अनंत कुलकर्णी यांची औषध चिठ्ठी असून उच्च रक्तदाब (BP) आणि गुडघेदुखीच्या उपचारांसाठी आहे.',
          keyPoints: [
            'सकाळी नाष्ट्यानंतर: तेलमा ४० (Telma 40) - १ गोळी नियमित घ्या.',
            'रात्री झोपण्यापूर्वी: अमलोकाइंड ५ (Amlokind 5) - १ गोळी नियमित घ्या.',
            'दुपारी जेवणानंतर: कॅल्शियम गोळी (Shelcal 500) - १ गोळी.',
            'गुडघ्यांना वेदना असल्यास वोलीनी जेल (Volini) हलक्या हाताने लावा.'
          ],
          actionRequired: [
            'जेवणात मीठ (सोडियम) कमी ठेवा (दिवसाला १ चमच्यापेक्षा कमी).',
            'दररोज सकाळी २० मिनिटे सावकाश फिरा.'
          ],
          importantDates: [
            '१५ सप्टेंबर २०२६: उपाशीपोटी रक्तातील साखर (Sugar) व क्रिएटिनिन चाचणी करायची आहे.',
            '१८ सप्टेंबर २०२६: पुढील तपासणीसाठी डॉक्टरांकडे जायचे आहे.'
          ],
          warnings: [
            'रक्तदाबाची गोळी कधीही चुकवू नका.',
            'चक्कर आल्यास किंवा अस्वस्थ वाटल्यास ताबडतोब साथी अॅपमधील SOS दाबा.'
          ],
          language: 'mr',
          analyzedAt: Date.now(),
          confidenceScore: 0.96
        };
      } else if (isPension) {
        return {
          id: `doc-${Date.now()}`,
          fileName: docName,
          documentType: 'सरकारी पेन्शन जीवन प्रमाणपत्र सूचना (Life Certificate)',
          summary: 'हे सरकारी पेन्शन (२४,५०० रु./महिना) अखंडित सुरू राहण्यासाठी वार्षिक हयातीचा दाखला (जीवन प्रमाणपत्र) जमा करण्याचे पत्र आहे.',
          keyPoints: [
            'तुमचा पेन्शन PPO क्रमांक: 7129004821.',
            'पेन्शन सुरू राहण्यासाठी दरवर्षी जीवन प्रमाणपत्र देणे अनिवार्य आहे.'
          ],
          actionRequired: [
            'जवळच्या सीएससी केंद्र, बँक शाखा किंवा घरी बसून मोबाईल अॅपने डिजिटल जीवन प्रमाणपत्र जमा करा.',
            'सोबत आधार कार्ड आणि पेन्शन पासबुक आवश्यक आहे.'
          ],
          importantDates: [
            'अंतिम तारीख: ३० नोव्हेंबर २०२६ पूर्वी जमा करणे अनिवार्य आहे.'
          ],
          warnings: [
            '३० नोव्हेंबरपूर्वी जमा न केल्यास डिसेंबर महिन्याची पेन्शन तात्पुरती थांबू शकते.',
            'घरी येऊन मदत मिळण्यासाठी १८००-१८०-११११ या टोल-फ्री क्रमांकावर संपर्क साधा.'
          ],
          language: 'mr',
          analyzedAt: Date.now(),
          confidenceScore: 0.98
        };
      } else {
        return {
          id: `doc-${Date.now()}`,
          fileName: docName,
          documentType: 'महावितरण वीज बिल (Electricity Bill)',
          summary: 'हे ऑगस्ट २०२६ महिन्याचे घरगुती वीज बिल असून एकूण १,५४८ रुपये भरायचे आहेत.',
          keyPoints: [
            'एकूण वापरलेली वीज: १४२ युनिट्स.',
            'ग्राहक क्रमांक: 021584930129.'
          ],
          actionRequired: [
            '५ सप्टेंबरपूर्वी बिल भरल्यास २५ रुपये तात्काळ सवलत मिळेल.'
          ],
          importantDates: [
            'सवलत मिळण्याची तारीख: ०५ सप्टेंबर २०२६.',
            'अंतिम देय तारीख (दंड न लागता): १० सप्टेंबर २०२६.'
          ],
          warnings: [
            '१० सप्टेंबर नंतर बिल भरल्यास विलंब शुल्क (Late Fee) आकारले जाईल.'
          ],
          language: 'mr',
          analyzedAt: Date.now(),
          confidenceScore: 0.95
        };
      }
    } else if (language === 'hi') {
      if (isMedical) {
        return {
          id: `doc-${Date.now()}`,
          fileName: docName,
          documentType: 'डॉक्टर की दवा पर्ची (Medical Prescription)',
          summary: 'यह डॉ. अनंत कुलकर्णी द्वारा उच्च रक्तचाप (BP) और घुटनों के दर्द के लिए दी गई दवा की पर्ची है।',
          keyPoints: [
            'सुबह नाश्ते के बाद: तेलमा 40 (Telma 40) - 1 गोली लें।',
            'रात को सोने से पहले: अमलोकाइंड 5 (Amlokind 5) - 1 गोली लें।',
            'दोपहर भोजन के बाद: कैल्शियम शैलकल 500 (Shelcal 500) - 1 गोली लें।',
            'घुटनों पर दर्द होने पर वोलीनी जेल (Volini) लगाएं।'
          ],
          actionRequired: [
            'भोजन में नमक की मात्रा कम रखें (प्रतिदिन 1 चम्मच से कम)।',
            'रोजाना 20 मिनट सुबह टहलें।'
          ],
          importantDates: [
            '15 सितंबर 2026: ब्लड शुगर और किडनी टेस्ट की जांच करानी है।',
            '18 सितंबर 2026: डॉक्टर से अगली मुलाकात (Follow-up)।'
          ],
          warnings: [
            'बीपी की दवा कभी न छोड़ें।',
            'चक्कर या कमजोरी महसूस होने पर तुरंत साथी ऐप का SOS दबाएं।'
          ],
          language: 'hi',
          analyzedAt: Date.now(),
          confidenceScore: 0.96
        };
      } else if (isPension) {
        return {
          id: `doc-${Date.now()}`,
          fileName: docName,
          documentType: 'पेंशन जीवन प्रमाण पत्र सूचना (Jeevan Pramaan)',
          summary: 'यह पेंशन (24,500 रुपये/माह) जारी रखने हेतु वार्षिक डिजिटल जीवन प्रमाण पत्र जमा करने की सरकारी सूचना है।',
          keyPoints: [
            'पेंशन PPO नंबर: 7129004821.',
            'वार्षिक जीवन प्रमाण पत्र जमा करना अनिवार्य है।'
          ],
          actionRequired: [
            'आधार कार्ड और बैंक पासबुक लेकर नजदीकी बैंक शाखा या जन सेवा केंद्र जाएं या घर पर डिजिटल जमा करें।'
          ],
          importantDates: [
            'अंतिम तिथि: 30 नवंबर 2026 तक जमा करना अनिवार्य है।'
          ],
          warnings: [
            'समय पर जमा न होने पर दिसंबर से पेंशन रुक सकती है।',
            'डोर-स्टेप सहायता हेतु 1800-180-1111 पर कॉल करें।'
          ],
          language: 'hi',
          analyzedAt: Date.now(),
          confidenceScore: 0.98
        };
      } else {
        return {
          id: `doc-${Date.now()}`,
          fileName: docName,
          documentType: 'बिजली उपयोग बिल (Electricity Bill)',
          summary: 'यह अगस्त 2026 माह का बिजली बिल है, जिसमें कुल 1,548 रुपये का भुगतान करना है।',
          keyPoints: [
            'बिजली खपत: 142 यूनिट।',
            'उपभोक्ता संख्या: 021584930129।'
          ],
          actionRequired: [
            '5 सितंबर से पहले भुगतान करने पर 25 रुपये की छूट मिलेगी।'
          ],
          importantDates: [
            'छूट की तारीख: 05 सितंबर 2026।',
            'अंतिम देय तिथि: 10 सितंबर 2026।'
          ],
          warnings: [
            '10 सितंबर के बाद भुगतान करने पर लेट फीस लगेगी।'
          ],
          language: 'hi',
          analyzedAt: Date.now(),
          confidenceScore: 0.95
        };
      }
    } else {
      // English
      if (isMedical) {
        return {
          id: `doc-${Date.now()}`,
          fileName: docName,
          documentType: 'Medical Prescription & Lab Order',
          summary: 'Prescription by Dr. Anant Kulkarni for Blood Pressure management and Knee Joint pain relief.',
          keyPoints: [
            'Morning after breakfast: Telma 40mg (1 Tablet daily).',
            'Night before bed: Amlokind 5mg (1 Tablet daily).',
            'Afternoon after lunch: Shelcal 500 Calcium (1 Tablet daily).',
            'Apply Volini pain gel to knees as needed.'
          ],
          actionRequired: [
            'Limit salt intake to less than 1 teaspoon daily.',
            'Light 20-minute daily morning walk.'
          ],
          importantDates: [
            '15 September 2026: Fasting Sugar & Creatinine blood test.',
            '18 September 2026: Clinic follow-up review appointment.'
          ],
          warnings: [
            'Do not skip blood pressure medication.',
            'If feeling dizzy or breathless, immediately trigger SAATHI SOS.'
          ],
          language: 'en',
          analyzedAt: Date.now(),
          confidenceScore: 0.96
        };
      } else if (isPension) {
        return {
          id: `doc-${Date.now()}`,
          fileName: docName,
          documentType: 'Govt Pension Life Certificate Notice',
          summary: 'Official annual notification to submit your Life Certificate (Jeevan Pramaan) to continue monthly pension (Rs. 24,500/mo).',
          keyPoints: [
            'Pension PPO Number: 7129004821.',
            'Mandatory annual verification for FY 2026-27.'
          ],
          actionRequired: [
            'Submit Digital Life Certificate via Aadhaar face app or visit your bank branch / CSC centre with Aadhaar card.'
          ],
          importantDates: [
            'Deadline: 30 November 2026.'
          ],
          warnings: [
            'Failure to submit before 30 Nov will result in pension pause starting Dec 2026.',
            'For doorstep biometric service, call toll-free helpline 1800-180-1111.'
          ],
          language: 'en',
          analyzedAt: Date.now(),
          confidenceScore: 0.98
        };
      } else {
        return {
          id: `doc-${Date.now()}`,
          fileName: docName,
          documentType: 'Monthly Electricity Utility Bill',
          summary: 'Residential electricity bill for August 2026 totaling Rs. 1,548.00.',
          keyPoints: [
            'Units consumed: 142 kWh.',
            'Consumer Account: 021584930129.'
          ],
          actionRequired: [
            'Pay online or via UPI before prompt discount date to save Rs. 25.'
          ],
          importantDates: [
            'Discount Due Date: 05 September 2026.',
            'Final Regular Due Date: 10 September 2026.'
          ],
          warnings: [
            'Late surcharge fee applies after 10 September 2026.'
          ],
          language: 'en',
          analyzedAt: Date.now(),
          confidenceScore: 0.95
        };
      }
    }
  }
}

export const aiService = new AIService();
