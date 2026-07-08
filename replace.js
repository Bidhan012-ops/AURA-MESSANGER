const fs = require('fs');
let content = fs.readFileSync('app/(app)/page.tsx', 'utf8');

// Spacing
content = content.replace(/gap-unit/g, 'gap-2');
content = content.replace(/gap-stack-sm/g, 'gap-2');
content = content.replace(/gap-gutter/g, 'gap-6');
content = content.replace(/gap-stack-lg/g, 'gap-8');
content = content.replace(/gap-stack-md/g, 'gap-4');
content = content.replace(/p-stack-md/g, 'p-4');
content = content.replace(/px-container-padding-desktop/g, 'px-10');
content = content.replace(/px-container-padding-mobile/g, 'px-5');
content = content.replace(/py-stack-lg/g, 'py-8');
content = content.replace(/mb-stack-lg/g, 'mb-8');
content = content.replace(/mt-stack-md/g, 'mt-4');

// Text sizes
content = content.replace(/text-headline-xl-mobile/g, 'text-[32px] leading-[40px] tracking-[-0.02em] font-bold');
content = content.replace(/text-headline-xl/g, 'text-[48px] leading-[56px] tracking-[-0.02em] font-bold');
content = content.replace(/text-body-md/g, 'text-[16px] leading-[24px] font-normal');
content = content.replace(/text-body-lg/g, 'text-[18px] leading-[28px] font-normal');
content = content.replace(/text-headline-lg-mobile/g, 'text-[24px] leading-[32px] tracking-[-0.01em] font-semibold');
content = content.replace(/text-headline-lg/g, 'text-[32px] leading-[40px] tracking-[-0.01em] font-semibold');
content = content.replace(/text-label-md/g, 'text-[14px] leading-[20px] tracking-[0.05em] font-semibold');
content = content.replace(/text-label-sm/g, 'text-[12px] leading-[16px] font-medium');
content = content.replace(/text-headline-md/g, 'text-[24px] leading-[32px] font-semibold');

// Fonts
content = content.replace(/font-headline-xl-mobile/g, "font-['Plus_Jakarta_Sans']");
content = content.replace(/font-headline-xl/g, "font-['Plus_Jakarta_Sans']");
content = content.replace(/font-body-md/g, "font-['Plus_Jakarta_Sans']");
content = content.replace(/font-body-lg/g, "font-['Plus_Jakarta_Sans']");
content = content.replace(/font-headline-lg-mobile/g, "font-['Plus_Jakarta_Sans']");
content = content.replace(/font-headline-lg/g, "font-['Plus_Jakarta_Sans']");
content = content.replace(/font-label-md/g, "font-['Plus_Jakarta_Sans']");
content = content.replace(/font-label-sm/g, "font-['Plus_Jakarta_Sans']");
content = content.replace(/font-headline-md/g, "font-['Plus_Jakarta_Sans']");

// Background and rounding
content = content.replace(/rounded-DEFAULT/g, 'rounded');

fs.writeFileSync('app/(app)/page.tsx', content);
console.log('Replaced custom tailwind tokens with arbitrary values.');
