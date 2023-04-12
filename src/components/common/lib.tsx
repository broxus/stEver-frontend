import * as React from 'react'

import { uniqueId } from '@/utils'

function getSize(height: number, width: number, ratio: number = 1) {
    return {
        height: height * ratio,
        width: width * ratio,
    }
}

export const defaultProps = {
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
}

type Props = {
    ratio?: number
}

function t<V extends React.ElementType<Props>, T extends { [key in string]: V }>(obj: T): T {
    return obj
}

/* eslint-disable */
const libraryIcon = t({
    everscale1BlockchainIcon: ({ ratio, ...props }) => {
        const gradientId = uniqueId()
        return (
            <svg {...defaultProps} {...props} viewBox="0 0 600 600" {...getSize(20, 20, ratio)}>
                <path d="M300 600C465.685 600 600 465.685 600 300C600 134.315 465.685 0 300 0C134.315 0 0 134.315 0 300C0 465.685 134.315 600 300 600Z" fill={`url(#paint0_linear_126_${gradientId})`} />
                <path fillRule="evenodd" clipRule="evenodd" d="M322.598 505L445 383.512V155H216.488L95 277.5H322.5L322.598 505Z" fill="white" />
                <defs><linearGradient id={`paint0_linear_126_${gradientId}`} x1="600" y1="0.000226805" x2="54.5601" y2="541.13" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF6922" /><stop offset="1" stopColor="#6347F5" /></linearGradient></defs>
            </svg>
        )
    },
    everCoinIcon: ({ ratio, ...props }) => {
        const gradientId = uniqueId()
        return (
            <svg {...defaultProps} {...props} viewBox="0 0 600 600" {...getSize(20, 20, ratio)}>
                <path d="M300 600C465.685 600 600 465.685 600 300C600 134.315 465.685 0 300 0C134.315 0 0 134.315 0 300C0 465.685 134.315 600 300 600Z" fill={`url(#paint0_linear_126_${gradientId})`} />
                <path fillRule="evenodd" clipRule="evenodd" d="M322.598 505L445 383.512V155H216.488L95 277.5H322.5L322.598 505Z" fill="white" />
                <defs><linearGradient id={`paint0_linear_126_${gradientId}`} x1="600" y1="0.000226805" x2="54.5601" y2="541.13" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF6922" /><stop offset="1" stopColor="#6347F5" /></linearGradient></defs>
            </svg>
        )
    },
    everWalletIcon: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 1024 1024" {...getSize(20, 20, ratio)}><rect width="1024" height="1024" rx="512" fill="#050B2E" className="uk-preserve" /><path d="M391.935 256L160 490.49H537.022V864L768 632.859V256H391.935Z" fill="#C5E4F3" className="uk-preserve" /></svg>,

    menu: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 24 24" {...getSize(20, 20, ratio)}><path fillRule="evenodd" clipRule="evenodd" d="M22 5V7H2V5H22Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M22 11V13H2V11H22Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M22 17V19H2V17H22Z" fill="currentColor" /></svg>,
    arrowDown: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path d="M10 13L5 8H15L10 13Z" fill="currentColor" /></svg>,
    arrowLeft: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 6 12" {...getSize(12, 6, ratio)}><path fill="currentColor" d="M-2.62268e-07 6L6 0L6 12L-2.62268e-07 6Z" /></svg>,
    arrowRight: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 6 12" {...getSize(12, 6, ratio)}><path fill="currentColor" d="M6 6L0 12L-5.24537e-07 0L6 6Z" /></svg>,
    externalLink: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 512 512" {...getSize(20, 20, ratio)}><path d="M511.5,0.9v255.5h-34.4V63.2L159.4,381l-24.2-24.2L457.6,34.4H256V0h255.5V0.9z M374.9,477.6H34.8V137.5 h223.9v-34.4H0.5V512h408.9V249h-34.4V477.6z" fill="currentColor" strokeWidth={1.6} /></svg>,
    close: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 40 40" {...getSize(40, 40, ratio)}><path d="M14 14L20 20M20 20L14 26M20 20L26 14M20 20L26 26" stroke="currentColor" strokeWidth={2} /></svg>,
    trash: ({ ratio, ...props }) => <svg{...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path d="M2.5 3H8V2C8 1.5 8.5 1 9 1H11C11.5 1 12 1.5 12 2V3H17.5V5H2.5V3Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M4 6L5 19H15L16 6H4ZM7.75 16L7.5 9H9V16H7.75ZM12.5 9L12.25 16H11V9H12.5Z" fill="currentColor" /></svg>,
    config: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 24 24" {...getSize(24, 24, ratio)}><path d="M17.0458 20.2491C17.8104 19.764 18.503 19.1724 19.1031 18.4941L21.2666 19.7627L23.2365 16.298L21.0774 15.0321C21.3519 14.181 21.5134 13.2783 21.5436 12.3426L24 11.9028L23.3156 7.9629L20.8597 8.40269C20.5203 7.54852 20.0649 6.75427 19.5127 6.04049L21.1181 4.09798L18.0999 1.52657L16.4959 3.46742C15.7124 3.04112 14.864 2.72245 13.9698 2.53122V0L10.03 0V2.53122C9.13573 2.72245 8.2873 3.04112 7.50375 3.46742L5.89979 1.52657L2.88162 4.09807L4.48685 6.04058C3.93473 6.75436 3.47938 7.54871 3.13997 8.40279L0.684057 7.96299L0 11.9029L2.45601 12.3427C2.48628 13.2785 2.64785 14.181 2.92238 15.0324L0.763035 16.2982L2.73306 19.7628L4.89665 18.4946C5.49658 19.1725 6.18913 19.7643 6.95388 20.2494L6.09985 22.6317L9.80225 23.9998L10.6551 21.6207C11.0946 21.6839 11.5435 21.7174 11.9999 21.7174C12.4563 21.7174 12.9053 21.684 13.3448 21.6207L14.1976 24L17.8998 22.6315L17.0458 20.2491ZM11.9997 18C8.6861 17.9999 6 15.3136 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3138 15.3135 18.0002 11.9997 18Z" /></svg>,
    info: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path fillRule="evenodd" clipRule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17ZM10.75 9V14H9.25V9H10.75ZM10.75 7V5.5H9.25V7H10.75Z" /></svg>,
    link: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path fill="none" stroke="currentColor" strokeWidth={1.1} d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375" /><path fill="none" stroke="currentColor" strokeWidth={1.1} d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375" /><path fill="none" stroke="currentColor" strokeWidth={1.1} d="M7.925,11.875 L11.925,7.975" /></svg>,
    loader: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 22 22" {...getSize(22, 22, ratio)}><path d="M11 22C17.0959 22 22 17.0959 22 11C22 7.12134 20.0146 3.72514 17 1.76773L16 3.45543C18.4345 5.04268 20 7.78975 20 11C20 16.0799 16.0799 20 11 20C5.92011 20 2 16.0799 2 11C2 5.92011 5.92011 2 11 2V0C4.90413 0 0 4.90413 0 11C0 17.0959 4.90413 22 11 22Z" fill="currentColor" /></svg>,
    logout: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 32 32" {...getSize(32, 32, ratio)}><path fillRule="evenodd" clipRule="evenodd" d="M18.4753 18.2903H19.295H20.1146V21.5162V23.9355H15.1966L15.1967 27L13.0492 26.2799L8.11633 24.662C7.4459 24.433 7 24.2782 7 24.2782V7H8.63938C8.66196 7 8.68378 7.00459 8.70558 7.00919C8.72248 7.01275 8.73936 7.0163 8.75659 7.01772C8.76929 7.01605 8.78125 7.01267 8.79315 7.00931C8.80968 7.00464 8.8261 7 8.84424 7H17.6556H20.1146V11.8387H19.295H18.4753L18.4754 8.61267L17.6556 8.61281H13.8376H11.918L15.1966 9.41936V22.3226H18.4753V21.5162V18.2903ZM23.153 11.2686L27 15.0644C27 15.0644 26.7522 15.3194 26.4318 15.6346L23.153 18.8605L21.7541 20.2257L21.7539 15.8709H17.6556V15.0645V14.2581H21.7539L21.7541 9.90301L23.153 11.2686Z" /></svg>,
    plus: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 36 36" {...getSize(36, 36, ratio)}><path d="M18 27V9" stroke="currentColor" strokeWidth={2} /><path d="M9 18L27 18" stroke="currentColor" strokeWidth={2} /></svg>,
    pull: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 22 21" {...getSize(21, 22, ratio)}><path d="M11 0V13.3333M11 13.3333L16 8.33333M11 13.3333L6 8.33333" stroke="currentColor" strokeWidth={2} /><path d="M1.83334 12.5V19.1667H20.1667V12.5" stroke="currentColor" strokeWidth={2} /></svg>,
    push: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 22 21" {...getSize(21, 22, ratio)}><path d="M11 14.334L11 2.00065M11 2.00065L6 7.00065M11 2.00065L16 7.00065" stroke="currentColor" strokeWidth={2} /><path d="M1.83334 12.5V19.1667H20.1667V12.5" stroke="currentColor" strokeWidth={2} /></svg>,
    remove: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 14 14" {...getSize(14, 14, ratio)}><path d="M1 1L7 7M7 7L1 13M7 7L13 1M7 7L13 13" stroke="currentColor" strokeWidth={2} /></svg>,
    reverse: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 36 36" {...getSize(36, 36, ratio)}><path d="M16 24L12 28M12 28L8 24M12 28C12 28 12 20.6863 12 16C12 13.6667 16 12 16 12" strokeWidth={1.4} /><path d="M20 12L24 8M24 8L28 12M24 8C24 8 24 15.3137 24 20C24 22.3333 20 24 20 24" strokeWidth={1.4} /></svg>,
    reverseHorizontal: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 24 24" {...getSize(24, 24, ratio)}><path d="M15.6001 13.2002L18.0001 15.6002M18.0001 15.6002L15.6001 18.0002M18.0001 15.6002C18.0001 15.6002 13.6119 15.6002 10.8001 15.6002C9.40015 15.6002 8.40015 13.2002 8.40015 13.2002" strokeWidth={1.4} /><path d="M8.39985 10.7998L5.99985 8.3998M5.99985 8.3998L8.39985 5.9998M5.99985 8.3998C5.99985 8.3998 10.3881 8.3998 13.1999 8.3998C14.5999 8.3998 15.5999 10.7998 15.5999 10.7998" strokeWidth={1.4} /></svg>,
    star: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 24 24" {...getSize(24, 24, ratio)}><path d="M14.6258 8.82306L14.7857 9.24051L15.2317 9.27097L22.2779 9.7522L16.8465 14.5363L16.5284 14.8165L16.6294 15.2283L18.3978 22.4392L12.3794 18.4874L11.9952 18.2351L11.611 18.4874L5.59272 22.4392L7.36114 15.2283L7.46204 14.8168L7.14433 14.5366L1.72029 9.7522L8.75876 9.27096L9.20473 9.24047L9.36467 8.82306L11.9952 1.95785L14.6258 8.82306Z" stroke="currentColor" strokeWidth={1.4} /></svg>,
    user: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path fillRule="evenodd" clipRule="evenodd" d="M6 6C6 3.7944 7.7944 2 10 2C12.2056 2 14 3.7944 14 6C14 8.2056 12.2056 10 10 10C7.7944 10 6 8.2056 6 6ZM10.9333 11.375C12.5514 11.375 14.0757 12.0208 15.2256 13.1936C16.3698 14.3606 17 15.901 17 17.5312C17 17.7901 16.7911 18 16.5333 18H3.46667C3.20894 18 3 17.7901 3 17.5312C3 15.901 3.63016 14.3606 4.77439 13.1936C5.92426 12.0208 7.44864 11.375 9.06667 11.375H10.9333Z" fill="currentColor" /></svg>,
    warning: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 24 24" {...getSize(24, 24, ratio)}><path fillRule="evenodd" clipRule="evenodd" d="M12.9354 3.55908C12.5117 2.85289 11.4883 2.85289 11.0646 3.55908L0.991306 20.3478C0.555036 21.0749 1.0788 22 1.92675 22H22.0732C22.9212 22 23.445 21.0749 23.0087 20.3478L12.9354 3.55908Z" fill="#EB4361" fillOpacity={0.32} /><path d="M10.63 20H13.38L13.38 17H10.63L10.63 20Z" fill="#EB4361" /><path d="M10.63 15H13.38L13.38 7H10.63L10.63 15Z" fill="#EB4361" /></svg>,
    check: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 10 8" {...getSize(10, 8, ratio)}><path d="M1.5 4L4 6.5L8.5 1" stroke="currentColor" strokeWidth="1.8" /></svg>,
    directionRight: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 28 14" {...getSize(28, 14, ratio)}><path d="M20 1L26 7M26 7L20 13M26 7H0" stroke="currentColor" strokeOpacity={0.48} strokeWidth={1.6} /></svg>,
    success: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 64 64" {...getSize(64, 64, ratio)}><path d="M5.3335 33.7017L23.5972 52.0002L58.6668 16.9652L53.632 12L23.5972 42L10.2986 28.7015L5.3335 33.7017Z" fill="currentColor" /></svg>,
    infoFill: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 16 16" {...getSize(16, 16, ratio)}><path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.875 5.25V3H9.125V5.25H6.875ZM6.875 13.625V6.875H9.125V13.625H6.875Z" fill="white" /></svg>,
    copy: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path d="M16 13V4H8M4 17H12.6V7H4V17Z" stroke="currentColor" strokeWidth="1.4" /></svg>,
    twitter: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path d="M19 4.77577C18.3306 5.07692 17.6174 5.27654 16.8737 5.37346C17.6388 4.905 18.2226 4.16885 18.4971 3.28154C17.7839 3.71769 16.9964 4.02577 16.1571 4.19769C15.4799 3.45808 14.5146 3 13.4616 3C11.4186 3 9.77387 4.70077 9.77387 6.78577C9.77387 7.08577 9.79862 7.37423 9.85938 7.64885C6.7915 7.49538 4.07687 5.98731 2.25325 3.69C1.93487 4.25654 1.74813 4.905 1.74813 5.60308C1.74813 6.91385 2.40625 8.07577 3.38725 8.74846C2.79437 8.73692 2.21275 8.56038 1.72 8.28231C1.72 8.29385 1.72 8.30885 1.72 8.32385C1.72 10.1631 2.99912 11.6908 4.6765 12.0427C4.37612 12.1269 4.04875 12.1673 3.709 12.1673C3.47275 12.1673 3.23425 12.1535 3.01038 12.1027C3.4885 13.6015 4.84525 14.7035 6.4585 14.7392C5.203 15.7465 3.60888 16.3535 1.88313 16.3535C1.5805 16.3535 1.29025 16.3396 1 16.3015C2.63462 17.3827 4.57188 18 6.661 18C13.4515 18 17.164 12.2308 17.164 7.23C17.164 7.06269 17.1584 6.90115 17.1505 6.74077C17.8829 6.20769 18.4982 5.54192 19 4.77577Z" fill="currentColor" /></svg>,
    github: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path d="M10 1C5.0275 1 1 5.13211 1 10.2284C1 14.3065 3.5785 17.7648 7.15375 18.9841C7.60375 19.0709 7.76875 18.7853 7.76875 18.5403C7.76875 18.3212 7.76125 17.7405 7.7575 16.9712C5.254 17.5277 4.726 15.7332 4.726 15.7332C4.3165 14.6681 3.72475 14.3832 3.72475 14.3832C2.9095 13.8111 3.78775 13.8229 3.78775 13.8229C4.6915 13.887 5.16625 14.7737 5.16625 14.7737C5.96875 16.1847 7.273 15.777 7.7875 15.5414C7.8685 14.9443 8.10025 14.5381 8.3575 14.3073C6.35875 14.0764 4.258 13.2829 4.258 9.74709C4.258 8.73988 4.60675 7.91659 5.18425 7.27095C5.083 7.03774 4.77925 6.0994 5.263 4.82846C5.263 4.82846 6.01675 4.58116 7.738 5.77462C8.458 5.56958 9.223 5.46785 9.988 5.46315C10.753 5.46785 11.518 5.56958 12.238 5.77462C13.948 4.58116 14.7017 4.82846 14.7017 4.82846C15.1855 6.0994 14.8818 7.03774 14.7917 7.27095C15.3655 7.91659 15.7142 8.73988 15.7142 9.74709C15.7142 13.2923 13.6105 14.0725 11.608 14.2995C11.923 14.5765 12.2155 15.1423 12.2155 16.0071C12.2155 17.242 12.2043 18.2344 12.2043 18.5341C12.2043 18.7759 12.3617 19.0647 12.823 18.9723C16.4237 17.7609 19 14.3002 19 10.2284C19 5.13211 14.9703 1 10 1Z" fill="currentColor" /></svg>,
    medium: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path fillRule="evenodd" clipRule="evenodd" d="M11.3953 9.69767C11.3953 12.8444 8.84441 15.3953 5.69767 15.3953C2.55094 15.3953 0 12.8444 0 9.69767C0 6.55094 2.55094 4 5.69767 4C8.84441 4 11.3953 6.55094 11.3953 9.69767ZM17.4419 9.69767C17.4419 12.716 16.1924 15.1628 14.6512 15.1628C13.1099 15.1628 11.8605 12.716 11.8605 9.69767C11.8605 6.67937 13.1099 4.23256 14.6512 4.23256C16.1924 4.23256 17.4419 6.67937 17.4419 9.69767ZM18.9535 14.4651C19.5315 14.4651 20 12.2786 20 9.5814C20 6.88419 19.5315 4.69767 18.9535 4.69767C18.3755 4.69767 17.907 6.88419 17.907 9.5814C17.907 12.2786 18.3755 14.4651 18.9535 14.4651Z" fill="currentColor" /></svg>,
    telegram: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path d="M3.09992 9.02697C7.39487 7.05126 10.2589 5.74875 11.6919 5.11944C15.7834 3.32264 16.6335 3.01052 17.1877 3.0001C17.3095 2.99794 17.582 3.02983 17.7586 3.18106C17.9076 3.30876 17.9486 3.48125 17.9683 3.60232C17.9879 3.72339 18.0123 3.99919 17.9929 4.21469C17.7712 6.67437 16.8118 12.6434 16.3237 15.3983C16.1172 16.564 15.7105 16.9548 15.3168 16.9931C14.4613 17.0762 13.8116 16.3961 12.9829 15.8226C11.6862 14.9251 10.9537 14.3664 9.69503 13.4907C8.24042 12.4786 9.18338 11.9224 10.0124 11.0133C10.2293 10.7754 13.999 7.15516 14.0719 6.82675C14.0811 6.78568 14.0895 6.63258 14.0034 6.55173C13.9172 6.47089 13.7901 6.49853 13.6983 6.52052C13.5683 6.55169 11.4968 7.9973 7.48389 10.8573C6.89591 11.2836 6.36333 11.4913 5.88616 11.4805C5.36012 11.4685 4.34822 11.1664 3.59598 10.9083C2.67333 10.5916 1.94002 10.4242 2.00388 9.88638C2.03714 9.60627 2.40248 9.3198 3.09992 9.02697Z" fill="currentColor" /></svg>,
    discord: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path d="M16.5054 4.47543C14.9479 3.22203 12.4839 3.00957 12.3784 3.00192C12.2148 2.98817 12.0589 3.07988 11.9917 3.2312C11.9856 3.24038 11.9321 3.36419 11.8725 3.55678C12.9027 3.73103 14.1683 4.08107 15.3132 4.79184C15.4966 4.90495 15.5532 5.14646 15.44 5.32988C15.3651 5.45063 15.2383 5.51636 15.1068 5.51636C15.0365 5.51636 14.9647 5.49649 14.9005 5.45675C12.9317 4.23545 10.4738 4.17431 10 4.17431C9.52615 4.17431 7.06675 4.23545 5.09952 5.45675C4.9161 5.57139 4.67459 5.51483 4.56148 5.33141C4.44684 5.14646 4.5034 4.90648 4.68682 4.79184C5.83169 4.0826 7.09732 3.73103 8.12755 3.55831C8.06793 3.36419 8.01444 3.2419 8.00985 3.2312C7.94107 3.07988 7.78668 2.98511 7.6216 3.00192C7.51613 3.00957 5.05214 3.22203 3.47317 4.49224C2.64929 5.25498 1 9.71218 1 13.5656C1 13.6344 1.01834 13.7001 1.05197 13.7597C2.1892 15.7591 5.29365 16.2818 6.00136 16.3047C6.00442 16.3047 6.009 16.3047 6.01359 16.3047C6.13893 16.3047 6.25662 16.2451 6.32999 16.1442L7.04535 15.1599C5.11481 14.6616 4.12891 13.8148 4.07235 13.7643C3.91033 13.6222 3.89504 13.3745 4.03872 13.2125C4.18088 13.0505 4.4285 13.0352 4.59052 13.1774C4.61345 13.1988 6.42935 14.7395 10 14.7395C13.5768 14.7395 15.3927 13.1927 15.411 13.1774C15.573 13.0367 15.8191 13.0505 15.9628 13.2141C16.105 13.3761 16.0897 13.6222 15.9276 13.7643C15.8711 13.8148 14.8852 14.6616 12.9547 15.1599L13.67 16.1442C13.7434 16.2451 13.8611 16.3047 13.9864 16.3047C13.991 16.3047 13.9956 16.3047 13.9986 16.3047C14.7064 16.2818 17.8108 15.7591 18.948 13.7597C18.9817 13.7001 19 13.6344 19 13.5656C19 9.71218 17.3507 5.25498 16.5054 4.47543ZM7.45652 12.0004C6.6999 12.0004 6.08696 11.3003 6.08696 10.4352C6.08696 9.57003 6.6999 8.86996 7.45652 8.86996C8.21315 8.86996 8.82609 9.57003 8.82609 10.4352C8.82609 11.3003 8.21315 12.0004 7.45652 12.0004ZM12.5435 12.0004C11.7869 12.0004 11.1739 11.3003 11.1739 10.4352C11.1739 9.57003 11.7869 8.86996 12.5435 8.86996C13.3001 8.86996 13.913 9.57003 13.913 10.4352C13.913 11.3003 13.3001 12.0004 12.5435 12.0004Z" fill="currentColor" /></svg>,
    chevronLeft: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path d="M13 16L7 10L13 4" stroke="currentColor" strokeWidth={1.6} /></svg>,
    chevronRight: ({ ratio, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth={1.6} /></svg>,
    world: ({ ratio, ...props }) => {
        const clipPathId = uniqueId()
        return (
            <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}>
                <g clipPath={`url(#clip0_9417_${clipPathId})`}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5 17.7942C18.8046 15.309 20.2795 9.80464 17.7942 5.50001C15.3089 1.19537 9.80463 -0.279501 5.49999 2.20578C1.19536 4.69106 -0.279517 10.1954 2.20576 14.5C4.69105 18.8046 10.1954 20.2795 14.5 17.7942ZM15.9699 5.29526C14.3627 3.25052 11.8464 2.21175 9.34483 2.42649C10.9803 3.24528 12.673 4.84228 14.0111 6.97063C14.8923 6.26328 15.5799 5.65231 15.9699 5.29526ZM2.94059 12.8178C1.97342 10.4035 2.33198 7.70489 3.76871 5.64586C3.66006 7.47164 4.19677 9.73603 5.37093 11.959C4.31775 12.3685 3.44483 12.6585 2.94059 12.8178ZM5.60134 3.98131C4.63681 5.38976 5.03831 8.41475 6.67319 11.4266C7.4851 11.0776 8.34889 10.6727 9.20079 10.2157L5.60134 3.98131ZM6.98698 3.18131L10.5864 9.41574C11.4081 8.90643 12.1906 8.36082 12.8988 7.83219C11.108 4.91044 8.689 3.05023 6.98698 3.18131ZM10.0008 11.6014C9.16093 12.0518 8.30951 12.4517 7.50764 12.7974C9.24539 15.3535 11.4367 16.9401 13.013 16.8187L10.0008 11.6014ZM14.3987 16.0187L11.3864 10.8014C12.1965 10.2993 12.9685 9.76187 13.6688 9.24026C15.0135 12.0232 15.2919 14.7143 14.3987 16.0187ZM3.68048 14.2223C4.17613 14.0669 5.08389 13.7678 6.18789 13.3381C7.49256 15.3122 9.09972 16.7948 10.6552 17.5735C7.96392 17.8046 5.25556 16.5847 3.68048 14.2223ZM16.8164 6.6383C18.0748 9.18357 17.777 12.139 16.2313 14.3542C16.3346 12.6178 15.8542 10.4846 14.7969 8.36766C15.7211 7.62645 16.434 6.98984 16.8164 6.6383Z" fill="white" />
                </g>
                <defs>
                    <clipPath id={`clip0_9417_${clipPathId}`}>
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        )
    },
    delete: ({ ratio, ...props }) => <svg {...defaultProps} {...props} {...getSize(20, 20, ratio)} viewBox="0 0 20 20">
        <path d="M2.5 3H8V2C8 1.5 8.5 1 9 1H11C11.5 1 12 1.5 12 2V3H17.5V5H2.5V3Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M4 6L5 19H15L16 6H4ZM7.75 16L7.5 9H9V16H7.75ZM12.5 9L12.25 16H11V9H12.5Z" fill="currentColor" />
    </svg>,
    share: ({ ratio, ...props }) => <svg {...defaultProps} {...props} {...getSize(20, 20, ratio)} viewBox="0 0 20 20"><path d="M15.9282 8C16.8087 9.52513 17.1614 11.2982 16.9316 13.0442C16.7017 14.7902 15.9021 16.4116 14.6569 17.6569C13.4116 18.9021 11.7902 19.7017 10.0442 19.9316C8.2982 20.1614 6.52514 19.8087 5 18.9282C3.47487 18.0477 2.2829 16.6885 1.60896 15.0615C0.93503 13.4344 0.816794 11.6305 1.27259 9.92945C1.72839 8.22838 2.73275 6.72525 4.12991 5.65317C5.52706 4.5811 7.23892 4 9 4L9 12L15.9282 8Z" fill="currentColor" fillOpacity="0.48" /><path d="M11 0C12.4043 1.6746e-08 13.7838 0.36965 15 1.0718C16.2162 1.77394 17.2261 2.78385 17.9282 4L11 8V0Z" fill="currentColor" /></svg>,
    swapLeftArrow: ({ ratio, ...props }) => <svg{...defaultProps} {...props} {...getSize(20, 21, ratio)} viewBox="0 0 21 20"><path d="M14.6001 5L19.6001 10M19.6001 10L14.6001 15M19.6001 10H0.600098" stroke="currentColor" strokeOpacity={0.48} strokeWidth={1.6} /></svg>,
})

export default libraryIcon
