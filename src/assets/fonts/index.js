import localFont from 'next/font/local'

export const fonts = localFont({
    src: [
        { path: './Montserratarm-Light.otf', weight: '300', style: 'normal' },
        { path: './Montserratarm-Regular.otf', weight: '400', style: 'normal' },
        { path: './Montserratarm-Medium.otf', weight: '500', style: 'normal' },
        { path: './Montserratarm-SemiBold.otf', weight: '600', style: 'normal' },
        { path: './Montserratarm-Bold.otf', weight: '700', style: 'normal' },
        { path: './Montserratarm-ExtraBold.otf', weight: '800', style: 'normal' },
        { path: './Montserratarm-Black.otf', weight: '900', style: 'normal' },
        { path: './ArmenianDecorativeU-Italic.ttf', weight: '100 900', style: 'italic' },
    ],
    variable: '--font-montserrat',
    display: 'swap',
})