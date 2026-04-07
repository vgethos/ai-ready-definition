"use client";

import React, { useState } from "react";
import CanvasLayout from "@/components/CanvasLayout";
import EthosHeader from "@/components/EthosHeader";
import ProgressBar from "@/components/ProgressBar";
import TextInput from "@/components/TextInput";
import DateInput from "@/components/DateInput";
import PrimaryButton from "@/components/PrimaryButton";
import InfoBanner from "@/components/InfoBanner";

const HOUSEHOLD_MEMBERS = ["Sarah Johnson", "Emma Johnson"];

// ──── SVG ICONS (from Figma) ────
function SpouseIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M55.6079 36.2175L47.8252 32.3291V29.7041C49.6771 28.0772 50.8541 25.7002 50.8541 23.0464V21.056C50.8541 21.056 50.8541 21.0445 50.8541 21.0329V16.0656C50.8541 13.2445 48.9214 11.1906 46.256 11.1618L45.4714 9.66757C45.2579 9.17719 44.8598 8.80796 44.3464 8.61758C43.856 8.43873 43.3137 8.4445 42.8233 8.64065L36.5348 11.133C34.631 11.9522 33.1368 14.1445 33.1368 16.1349V21.1022C33.1368 21.1022 33.1368 21.1079 33.1368 21.1137V23.0464C33.1368 25.5906 34.2214 27.881 35.9406 29.4964V32.4329L28.8445 35.981C28.3598 36.2233 28.1695 36.806 28.406 37.2906C28.6483 37.7752 29.2368 37.9656 29.7156 37.7291L36.8868 34.1464C37.7464 34.8041 39.5579 35.906 41.9925 35.906C44.4271 35.906 46.2387 34.7983 47.0983 34.1464L54.731 37.9656C55.9021 38.5541 56.8944 40.1291 56.8944 41.4156V53.831H33.1368C32.6002 53.831 32.1618 54.2694 32.1618 54.806C32.1618 55.3425 32.6002 55.781 33.1368 55.781H56.8944C57.9675 55.781 58.8444 54.9098 58.8444 53.831V41.4098C58.8444 39.4079 57.4194 37.1233 55.6079 36.2175ZM35.0925 16.1349C35.0925 14.9349 36.131 13.4349 37.2848 12.9387L43.5502 10.4522C43.5502 10.4522 43.6021 10.4407 43.6194 10.4407C43.6541 10.4407 43.6771 10.4464 43.6829 10.4522C43.6944 10.481 43.7118 10.5157 43.7233 10.5445L44.8021 12.5983C44.9694 12.9156 45.3041 13.1176 45.6675 13.1176H46.2098C48.0733 13.1176 48.9041 14.6003 48.9041 16.0714V17.0291C48.1079 16.458 47.1098 16.1349 45.9906 16.1349H38.1041C36.9675 16.1349 35.9233 16.5156 35.081 17.1618V16.1406L35.0925 16.1349ZM35.0925 23.0464V21.0849C35.1041 19.4291 36.4541 18.0849 38.1098 18.0849H45.9964C47.704 18.0849 48.8925 19.2849 48.9041 21.0099V23.0464C48.9041 26.8599 45.806 29.9579 41.9983 29.9579C40.3483 29.9579 38.831 29.3752 37.6425 28.4002C37.5906 28.3426 37.5271 28.2849 37.4579 28.2387C36.0098 26.9695 35.0925 25.1118 35.0925 23.0406V23.0464ZM37.8964 32.4502V30.8983C39.1252 31.5445 40.5214 31.9137 41.9983 31.9137C43.3887 31.9137 44.7041 31.5791 45.8752 31.0079V32.6291C45.2291 33.1137 43.8329 33.9618 41.9925 33.9618C39.9041 33.9618 38.3868 32.8714 37.8906 32.456L37.8964 32.4502Z" fill="#05594F"/>
      <path d="M31.6196 46.1531L29.5427 45.1146C30.01 44.18 30.2638 43.1185 30.2638 42.0339V31.6435C30.2638 23.8897 24.7658 17.5781 18.01 17.5781C11.2543 17.5781 5.75618 23.8897 5.75618 31.6435V42.0339C5.75618 43.1242 6.01003 44.1858 6.47157 45.1146L4.39464 46.1531C2.57734 47.0589 1.15234 49.3435 1.15234 51.3454V53.8319C1.15234 54.905 2.0235 55.7819 3.10234 55.7819H32.9119C33.985 55.7819 34.8619 54.9108 34.8619 53.8319V51.3454C34.8619 49.3435 33.4369 47.0589 31.6254 46.1531H31.6196ZM7.71195 31.6435C7.71195 24.9627 12.3331 19.5281 18.0158 19.5281C23.6985 19.5281 28.3196 24.9627 28.3196 31.6435V42.0339C28.3196 42.8185 28.1408 43.58 27.8062 44.2435L23.9639 42.3223V39.5358C25.7465 37.9146 26.8773 35.5839 26.8773 32.9877V31.5858C26.8773 29.855 25.4696 28.4531 23.7446 28.4531C21.685 28.4531 19.8273 27.2935 18.8927 25.43C18.7312 25.1012 18.3966 24.8935 18.0273 24.8935H18.0158C17.6523 24.8935 17.3235 25.0954 17.1504 25.4127C16.1754 27.2589 14.2716 28.4531 12.2927 28.4531C10.5619 28.4531 9.16003 29.8608 9.16003 31.5858V32.9877C9.16003 35.5839 10.2908 37.9146 12.0735 39.5358V42.3166L8.22542 44.2377C7.89657 43.58 7.71772 42.8185 7.71772 42.0281V31.6377L7.71195 31.6435ZM22.4754 38.2493C22.4004 38.2954 22.3369 38.3473 22.2735 38.4108C21.0965 39.3339 19.6196 39.8935 18.01 39.8935C16.4004 39.8935 14.9177 39.3339 13.7408 38.405C13.6889 38.3473 13.6254 38.3012 13.5619 38.2608C12.062 36.9916 11.1043 35.0993 11.1043 32.982V31.58C11.1043 30.9281 11.635 30.3973 12.2869 30.3973C14.4677 30.3973 16.5735 29.3473 17.9927 27.6339C19.3773 29.3704 21.4658 30.3973 23.7331 30.3973C24.385 30.3973 24.9158 30.9281 24.9158 31.58V32.982C24.9158 35.0877 23.9639 36.98 22.4696 38.2435L22.4754 38.2493ZM14.0177 40.8858C15.2177 41.4973 16.5735 41.8492 18.01 41.8492C19.4466 41.8492 20.8023 41.4973 22.0023 40.8858V42.4723C21.4139 42.9339 19.96 43.8916 18.0042 43.8916C16.0485 43.8916 14.6004 42.9339 14.0119 42.4723V40.88L14.0177 40.8858ZM3.10811 53.8319V51.3454C3.10811 50.0646 4.10042 48.4839 5.27157 47.8954L8.27734 46.3896C8.27734 46.3896 8.28888 46.3896 8.29465 46.3839H8.30041L12.9042 44.0819C13.7639 44.7396 15.5754 45.8416 18.01 45.8416C20.4446 45.8416 22.2562 44.7339 23.1158 44.0819L27.7254 46.3839L30.7542 47.8954C31.9254 48.4839 32.9119 50.0589 32.9119 51.3454V53.8262H3.11389L3.10811 53.8319Z" fill="#05594F"/>
      <path d="M32.2831 5.34651C31.5216 4.58497 30.5177 4.18113 29.4504 4.22151C28.5851 4.25036 27.7543 4.56767 27.062 5.12151C26.6004 4.75228 26.0524 4.4869 25.4408 4.3542C24.3793 4.12343 23.2774 4.31959 22.412 4.90228C22.3601 4.9369 22.337 4.9542 22.2908 5.00036C22.262 5.02343 22.2331 5.04074 22.1985 5.06382C22.0889 5.13882 21.9562 5.22536 21.8697 5.31766C21.1139 6.0042 20.6812 6.94459 20.6581 7.95997C20.6351 9.02728 21.0505 10.0484 21.8351 10.833L26.3697 15.3677C26.5543 15.5523 26.8024 15.6561 27.062 15.6561C27.3216 15.6561 27.5697 15.5523 27.7543 15.3677L32.2543 10.8619C33.01 10.1754 33.4427 9.23497 33.4658 8.21958C33.4889 7.15228 33.0735 6.13112 32.2889 5.34651H32.2831Z" fill="#34DC91"/>
    </svg>
  );
}

function ChildrenIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip_children_modal)">
        <path d="M17.377 9.82031L22.4366 17.453" stroke="#34DC91" strokeWidth="4.32692" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M31.4424 6.30078V15.6469" stroke="#34DC91" strokeWidth="4.32692" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M46.3614 9.73438L41.3018 17.794" stroke="#34DC91" strokeWidth="4.32692" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42.0463 25.935C42.8829 25.6235 43.7367 25.3984 44.7059 25.3984C48.9059 25.3984 52.3386 28.8311 52.3386 33.0311C52.3386 37.2311 48.9059 40.6638 44.7059 40.6638C40.5059 40.6638 37.0732 37.2311 37.0732 33.0311C37.0732 31.5715 37.5002 30.1984 38.1867 28.9984" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M41.845 25.9726C40.2988 26.1457 38.1008 26.3418 37.1546 24.9688C36.895 28.2284 38.0142 30.3688 42.0412 29.8553" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.2351 25.484C18.2082 25.0571 17.1755 24.7109 15.9755 24.7109C11.7755 24.7109 8.34277 28.1436 8.34277 32.3436C8.34277 36.5436 11.7755 39.9763 15.9755 39.9763C20.1755 39.9763 23.6082 36.5436 23.6082 32.3436C23.6082 31.0859 23.2909 29.8859 22.7601 28.8129" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.2352 25.4846C20.7756 25.6576 22.5814 25.7442 23.5218 24.3711C23.9429 27.8211 21.3468 29.898 17.2275 29.2749" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M48.5655 39.9766L52.6848 43.8362L55.8578 41.7766C56.7175 41.2631 57.8309 41.4362 58.4309 42.2035C59.1175 43.0631 58.9444 44.3496 58.004 45.0362L53.3713 48.3823C52.8578 48.7227 52.1713 48.7227 51.6578 48.2958L47.8848 45.2092" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30.1504 39.6367L30.5542 41.2636C30.7273 42.1232 31.5004 42.6367 32.36 42.6367H36.6408" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30.1504 31.875C30.2773 31.8173 30.41 31.7712 30.5542 31.7423C31.6735 31.4827 32.7869 32.1693 33.0408 33.2885L34.2465 37.9154H38.6196" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M47.8789 45.2098V53.7021H36.8135V42.6367" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.1735 38.9609L7.31581 43.8359L4.14273 41.7763C3.28312 41.2629 2.16965 41.4359 1.56965 42.2032C0.883112 43.0629 1.05619 44.3494 1.99658 45.0359L6.7158 48.2955C7.22926 48.6359 7.9158 48.6359 8.42927 48.209L12.1158 45.1225L12.1735 38.9609Z" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.1155 45.1212L8.94238 53.6943H26.5847L23.1751 42.6289" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.24467 34.9691C8.1062 38.8806 4.16582 39.6422 1.46582 36.9941C2.52736 34.4614 6.23697 33.0076 8.24467 34.9691Z" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23.1816 42.6346H27.9354C28.795 42.6346 29.5623 42.1212 29.7354 41.2616L31.4489 34.402C31.7085 33.202 30.9354 32.0019 29.7354 31.7423C28.6219 31.4827 27.5085 32.1693 27.2489 33.2885L26.0489 37.9212H21.6758L23.1816 42.6404V42.6346Z" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42.3467 40.6641V44.9506" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40.4482 35.2734C41.2675 36.7734 42.5367 37.2753 44.2444 36.7734" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.2812 35.6486C17.8851 36.2428 19.1659 35.787 20.1293 34.2812" stroke="#05594F" strokeWidth="2.01923" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip_children_modal">
          <rect width="60" height="60" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function AvatarIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.9983 31.9712C23.4208 31.9712 18.0752 26.62 18.0752 20.0481C18.0752 13.4762 23.4264 8.125 29.9983 8.125C36.5702 8.125 41.9213 13.4762 41.9213 20.0481C41.9213 26.62 36.5702 31.9712 29.9983 31.9712ZM29.9983 10.0704C24.4966 10.0704 20.0261 14.5464 20.0261 20.0425C20.0261 25.5386 24.5022 30.0146 29.9983 30.0146C35.4944 30.0146 39.9704 25.5386 39.9704 20.0425C39.9704 14.5464 35.4944 10.0704 29.9983 10.0704Z" fill="#05594F"/>
      <path d="M29.9985 58.8447C14.0899 58.8447 1.15234 45.9071 1.15234 29.9985C1.15234 14.0899 14.0899 1.15234 29.9985 1.15234C45.9071 1.15234 58.8447 14.0899 58.8447 29.9985C58.8447 45.9071 45.9071 58.8447 29.9985 58.8447ZM29.9985 3.10329C15.1657 3.10329 3.10329 15.1657 3.10329 29.9985C3.10329 44.8313 15.1657 56.8937 29.9985 56.8937C44.8313 56.8937 56.8937 44.8313 56.8937 29.9985C56.8937 15.1657 44.8313 3.10329 29.9985 3.10329Z" fill="#05594F"/>
      <path d="M50.422 49.6042C47.6851 41.0033 39.2849 35 29.9928 35C20.7007 35 12.3005 41.0033 9.56358 49.6042C9.45209 49.9554 9.54685 50.34 9.80883 50.5964C15.2325 55.9086 22.4008 58.8294 29.9928 58.8294C37.5848 58.8294 44.7531 55.903 50.1767 50.5964C50.4387 50.34 50.5335 49.9554 50.422 49.6042Z" fill="#34DC91"/>
      <path d="M50.4234 49.5965C50.2617 49.0893 50.0778 48.5876 49.8771 48.0971C44.9496 53.4984 37.8649 56.8931 29.9998 56.8931C22.1346 56.8931 15.0388 53.4928 10.1168 48.0859C9.91057 48.582 9.72663 49.0837 9.56498 49.5965C9.45907 49.9254 9.5371 50.2821 9.77122 50.5441C9.8827 50.65 9.99418 50.7615 10.1057 50.8674C10.4401 51.1852 10.7801 51.4973 11.1313 51.7983C12.012 52.5675 12.9262 53.2699 13.8794 53.9053C14.0744 54.0391 14.264 54.1673 14.4591 54.29C14.6542 54.4182 14.8548 54.5408 15.0499 54.6578C15.2506 54.7805 15.4513 54.8975 15.6519 55.0146C15.8415 55.1261 16.0365 55.232 16.2316 55.3379C17.1625 55.8507 18.1213 56.3078 19.1023 56.7036C19.3086 56.7872 19.5148 56.8708 19.7266 56.9488C19.7266 56.9488 19.7322 56.9488 19.7433 56.9488C19.9552 57.0324 20.167 57.1105 20.3844 57.1829C20.8191 57.339 21.2595 57.4839 21.6999 57.6177C22.0343 57.718 22.3688 57.8072 22.7032 57.8964C25.0388 58.5151 27.4802 58.8385 29.9998 58.8385C33.1491 58.8385 36.187 58.3256 39.0299 57.3836C39.2305 57.3111 39.4368 57.2442 39.643 57.1718C39.8437 57.0993 40.0499 57.0269 40.2506 56.9488C40.468 56.8652 40.6854 56.7816 40.8972 56.6924C41.0867 56.6144 41.2818 56.5363 41.4713 56.4527C41.711 56.3524 41.9451 56.2465 42.1792 56.135C42.3855 56.0402 42.5917 55.9399 42.7924 55.8396C42.9819 55.7448 43.1714 55.65 43.361 55.5497C43.8961 55.271 44.4256 54.9756 44.944 54.6523C45.1391 54.5352 45.3398 54.4126 45.5349 54.2844C45.73 54.1618 45.9195 54.0335 46.1146 53.8998C47.0678 53.2643 47.9819 52.562 48.8626 51.7927C49.2138 51.4917 49.5538 51.1796 49.8883 50.8619C49.9997 50.756 50.1112 50.65 50.2172 50.5386C50.4513 50.2822 50.5293 49.9198 50.4234 49.591V49.5965Z" fill="#003E37"/>
      <path d="M50.2172 50.5425C50.2172 50.5425 50.1949 50.5759 50.1781 50.5926C50.0834 50.6874 49.9886 50.7766 49.8883 50.8658C49.5538 51.1835 49.2138 51.4956 48.8626 51.7966C47.9819 52.5659 47.0678 53.2682 46.1146 53.9037C45.9195 54.0374 45.73 54.1656 45.5349 54.2883C45.3398 54.4165 45.1391 54.5391 44.944 54.6562C44.4256 54.9795 43.8961 55.2749 43.361 55.5536C43.1714 55.6539 42.9819 55.7487 42.7924 55.8435C42.5917 55.9438 42.3855 56.0441 42.1792 56.1389C41.9451 56.2504 41.711 56.3563 41.4713 56.4566C41.2818 56.5402 41.0867 56.6183 40.8972 56.6963C40.6854 56.7855 40.468 56.8691 40.2506 56.9527C40.0499 57.0308 39.8437 57.1032 39.643 57.1757C39.4368 57.2482 39.2305 57.315 39.0299 57.3875C36.148 58.3351 33.1045 58.8256 29.9942 58.8256C27.5025 58.8256 25.0555 58.5079 22.7032 57.9003C22.3688 57.8111 22.0343 57.7219 21.6999 57.6216C21.2595 57.4878 20.8191 57.3429 20.3844 57.1868C20.167 57.1144 19.9552 57.0363 19.7433 56.9527C19.7322 56.9527 19.7266 56.9527 19.7266 56.9527C19.5148 56.8747 19.3086 56.7911 19.1023 56.7075C18.1213 56.3117 17.1625 55.8546 16.2316 55.3418C16.0365 55.2359 15.8415 55.13 15.6519 55.0185C15.4513 54.9014 15.2506 54.7844 15.0499 54.6617C14.8548 54.5447 14.6542 54.4221 14.4591 54.2939C14.264 54.1712 14.0744 54.043 13.8794 53.9092C12.9262 53.2738 12.012 52.5715 11.1313 51.8022C10.7801 51.5012 10.4401 51.1891 10.1057 50.8713C10.0053 50.7821 9.91057 50.693 9.81581 50.5982C9.79909 50.5815 9.78236 50.5648 9.77122 50.548C9.5371 50.2861 9.45907 49.9293 9.56498 49.6004C9.72663 49.0876 9.91057 48.5859 10.1168 48.0898C15.0388 53.4968 22.1291 56.897 29.9998 56.897C37.8704 56.897 44.9496 53.5023 49.8771 48.101C50.0778 48.5915 50.2617 49.0932 50.4234 49.6004C50.5293 49.9293 50.4513 50.2916 50.2172 50.548V50.5425Z" fill="#003E37"/>
    </svg>
  );
}

const CARD_ICONS: Record<string, React.ReactNode> = {
  spouse: <SpouseIcon />,
  children: <ChildrenIcon />,
  other: <AvatarIcon />,
};

interface CategoryCard {
  id: string;
  category: "spouse" | "children" | "other";
  label: string;
  householdName?: string;
  name: string;
  birthdate: string;
  isComplete: boolean;
}

export default function PatternModal() {
  const [isPrefill, setIsPrefill] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Modal state
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Cards state
  const [cards, setCards] = useState<CategoryCard[]>([]);

  // Animation state
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [animPhase, setAnimPhase] = useState<"idle" | "exit" | "enter">("idle");

  const resetState = () => {
    setIsComplete(false);
    setCards([]);
    setActiveCardId(null);
    setModalVisible(false);
    setAnimPhase("idle");
    setSlideDirection("left");
  };

  const handleTogglePrefill = () => {
    setIsPrefill(!isPrefill);
    resetState();
  };

  const animateTransition = (direction: "left" | "right", action: () => void) => {
    setSlideDirection(direction);
    setAnimPhase("exit");
    setTimeout(() => {
      action();
      setAnimPhase("enter");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimPhase("idle");
        });
      });
    }, 250);
  };

  const handleComplete = () => {
    animateTransition("left", () => setIsComplete(true));
  };

  const getSlideTransform = () => {
    if (animPhase === "idle") return "translateX(0)";
    if (animPhase === "exit") {
      return slideDirection === "left" ? "translateX(-100%)" : "translateX(100%)";
    }
    return slideDirection === "left" ? "translateX(100%)" : "translateX(-100%)";
  };

  const getProgress = () => {
    if (isComplete) return 100;
    const completedCards = cards.filter((c) => c.isComplete).length;
    if (completedCards > 0) return 75;
    return 25;
  };

  const openModal = (cardId: string) => {
    setActiveCardId(cardId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setActiveCardId(null), 300);
  };

  const saveAndCloseModal = () => {
    if (activeCardId) {
      setCards((prev) =>
        prev.map((card) => {
          if (card.id === activeCardId) {
            const isComplete = card.name.trim() !== "" && card.birthdate.trim() !== "";
            return { ...card, isComplete };
          }
          return card;
        })
      );
    }
    closeModal();
  };

  const updateCard = (id: string, updates: Partial<CategoryCard>) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updates } : card))
    );
  };

  const addCategoryCard = (category: "spouse" | "children" | "other") => {
    const householdName =
      isPrefill && category === "spouse"
        ? HOUSEHOLD_MEMBERS[0]
        : isPrefill && category === "children"
        ? HOUSEHOLD_MEMBERS[1]
        : undefined;

    const newCard: CategoryCard = {
      id: `card-${Date.now()}-${Math.random()}`,
      category,
      label:
        category === "spouse"
          ? "My spouse or partner"
          : category === "children"
          ? "One of my children"
          : "Someone else",
      householdName,
      name: householdName || "",
      birthdate: "",
      isComplete: false,
    };

    setCards((prev) => [...prev, newCard]);
    openModal(newCard.id);
  };

  const activeCard = cards.find((c) => c.id === activeCardId);
  const isAnyCardComplete = cards.some((c) => c.isComplete);

  const getModalTitle = (card: CategoryCard) => {
    if (card.category === "spouse") return "Your spouse\u2019s details";
    if (card.category === "children") return "Your child\u2019s details";
    return "Beneficiary details";
  };

  const hasCategory = (category: string) => cards.some((c) => c.category === category);

  // ──── CATEGORY CARD (Figma-style) ────
  const renderCategoryButton = (
    category: "spouse" | "children" | "other",
    label: string,
    isPrimary: boolean
  ) => {
    const existing = cards.filter((c) => c.category === category);
    const allComplete = existing.length > 0 && existing.every((c) => c.isComplete);
    const hasCards = existing.length > 0;

    const householdHint =
      isPrefill && category === "spouse"
        ? HOUSEHOLD_MEMBERS[0]
        : isPrefill && category === "children"
        ? HOUSEHOLD_MEMBERS[1]
        : null;

    // If completed cards exist, show them as a compact summary
    if (hasCards) {
      return (
        <div key={category}>
          {existing.map((card) => (
            <button
              key={card.id}
              onClick={() => openModal(card.id)}
              className="w-full mb-2 bg-white rounded-2xl border border-gray-20 transition-all cursor-pointer flex items-center gap-3 p-4 text-left relative"
            >
              <div className="w-[40px] h-[40px] flex items-center justify-center flex-shrink-0">
                {React.cloneElement(CARD_ICONS[card.category] as React.ReactElement, { size: 40 })}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[15px] text-gray-100">
                  {card.isComplete ? card.name : card.label}
                </div>
                <div className="font-sans text-[12px] text-gray-60">
                  {card.isComplete ? "Tap to edit" : "Tap to add details"}
                </div>
              </div>
              {card.isComplete && (
                <div className="w-[22px] h-[22px] rounded-full bg-cypress-100 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              )}
            </button>
          ))}
          {/* Allow adding more for "other" category */}
          {category === "other" && (
            <button
              onClick={() => addCategoryCard("other")}
              className="w-full p-3 rounded-xl border border-dashed border-gray-20 hover:border-gray-40 transition-all text-center"
            >
              <span className="font-sans text-[13px] text-gray-60">+ Add another person</span>
            </button>
          )}
        </div>
      );
    }

    // Default: Figma-style square card
    return (
      <button
        key={category}
        onClick={() => addCategoryCard(category)}
        className="w-full bg-white rounded-2xl border border-gray-20 hover:border-gray-40 transition-all cursor-pointer flex flex-col items-center justify-center text-center"
        style={{ padding: isPrimary ? "28px 20px" : "24px 12px" }}
      >
        <div className="mb-3">
          {CARD_ICONS[category]}
        </div>
        <div className="font-sans text-[15px] text-gray-100 leading-snug whitespace-pre-line">
          {label}
        </div>
        {householdHint && (
          <div className="font-sans text-[12px] text-cypress-100 mt-1.5">
            {householdHint}
          </div>
        )}
      </button>
    );
  };

  // ──── MAIN SCREEN ────
  const renderMainScreen = () => {
    const spouseHasCards = hasCategory("spouse");
    const childrenHasCards = hasCategory("children");
    const otherHasCards = hasCategory("other");
    const anyHasCards = spouseHasCards || childrenHasCards || otherHasCards;

    // If any cards have been added, switch to compact list view
    if (anyHasCards) {
      return (
        <StepContent key="modal-main-compact">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-1">
            Choose who you want the main beneficiary to be
          </h2>
          <p className="text-[13px] text-gray-40 mb-6 font-sans">
            You can add more beneficiaries later on.
          </p>

          <div className="space-y-3 mb-6">
            {renderCategoryButton("spouse", "My spouse\nor partner", true)}
            {renderCategoryButton("children", "One of my\nadult children", false)}
            {renderCategoryButton("other", "Someone else", false)}
          </div>

          <InfoBanner message="Taking a moment now means your loved ones will be taken care of later." />

          <PrimaryButton
            label="Continue"
            onClick={handleComplete}
            disabled={!isAnyCardComplete}
          />
        </StepContent>
      );
    }

    // Default: Figma card layout
    return (
      <StepContent key="modal-main">
        <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-1">
          Choose who you want the main beneficiary to be
        </h2>
        <p className="text-[13px] text-gray-40 mb-8 font-sans">
          You can add more beneficiaries later on.
        </p>

        <div className="space-y-4 mb-8">
          {/* Primary card — centered */}
          <div className="flex justify-center">
            <div className="w-[60%]">
              {renderCategoryButton("spouse", "My spouse\nor partner", true)}
            </div>
          </div>

          {/* Secondary cards in 2-column grid */}
          <div className="grid grid-cols-2 gap-3">
            {renderCategoryButton("children", "One of my\nadult children", false)}
            {renderCategoryButton("other", "Someone else", false)}
          </div>
        </div>

        <PrimaryButton
          label="Continue"
          onClick={handleComplete}
          disabled={!isAnyCardComplete}
        />
      </StepContent>
    );
  };

  // ──── BOTTOM SHEET MODAL ────
  const renderModal = () => {
    if (!activeCard) return null;

    return (
      <>
        <div
          className="absolute inset-0 z-40 transition-all duration-300"
          style={{
            backgroundColor: modalVisible ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0)",
            backdropFilter: modalVisible ? "blur(2px)" : "blur(0px)",
            pointerEvents: modalVisible ? "auto" : "none",
          }}
          onClick={closeModal}
        />

        <div
          className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-[20px] transition-transform duration-300 ease-out"
          style={{
            transform: modalVisible ? "translateY(0)" : "translateY(100%)",
            boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-[36px] h-[4px] rounded-full bg-gray-20" />
          </div>

          <div className="px-5 pt-2 pb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-[20px] text-gray-100">
                {getModalTitle(activeCard)}
              </h3>
              <button
                onClick={closeModal}
                className="w-[28px] h-[28px] rounded-full bg-accent-subtle4x flex items-center justify-center text-gray-60 hover:text-gray-100 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <TextInput
              label="Full name"
              value={activeCard.name}
              placeholder="Enter full name"
              onChange={(val) => updateCard(activeCard.id, { name: val })}
              readOnly={!!activeCard.householdName && isPrefill}
            />

            <DateInput
              label="Date of birth"
              value={activeCard.birthdate}
              onChange={(val) => updateCard(activeCard.id, { birthdate: val })}
            />

            <div className="mt-4">
              <PrimaryButton
                label="Save"
                onClick={saveAndCloseModal}
                disabled={!activeCard.name.trim()}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderCompletionScreen = () => {
    return (
      <StepContent key="completion">
        <div className="flex flex-col items-center text-center pt-12 pb-8">
          <div className="w-[72px] h-[72px] rounded-full bg-cypress-100 flex items-center justify-center mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="font-serif text-[28px] text-gray-100 leading-snug mb-3">
            You&apos;re all set!
          </h2>
          <p className="text-[14px] text-gray-60 font-sans leading-relaxed mb-10 max-w-[260px]">
            Your loved ones are now protected. You&apos;re one step closer to
            receiving your unique Real Rate.
          </p>
          <PrimaryButton label="Restart Demo" onClick={resetState} />
        </div>
      </StepContent>
    );
  };

  const handleBack = () => {
    if (modalVisible) {
      closeModal();
    } else if (isComplete) {
      animateTransition("right", () => setIsComplete(false));
    }
  };

  const renderContent = () => {
    if (isComplete) return renderCompletionScreen();
    return renderMainScreen();
  };

  return (
    <CanvasLayout
      isPrefill={isPrefill}
      onTogglePrefill={handleTogglePrefill}
      currentPattern="modal"
      patternTitle="Modal Details"
      patternDescription="Category selector with bottom-sheet modal for details. Main screen stays visible behind the modal, creating a focused sub-task experience."
      patternBullets={[
        "Category selector with bottom-sheet modal for details",
        "Main screen stays visible (dimmed) behind modal \u2014 preserves context",
        "Feels like a focused side-task, not a full page navigation",
        "Clean separation between \u201Cwho\u201D (main screen) and \u201Cdetails\u201D (modal)",
      ]}
    >
      <div className="relative" style={{ minHeight: "calc(100% - 55px)" }}>
        <EthosHeader onBack={handleBack} showBack={isComplete || modalVisible} />
        <ProgressBar progress={getProgress()} />
        <div className="relative overflow-hidden">
          <div
            style={{
              transform: getSlideTransform(),
              transition: animPhase === "enter" ? "none" : "transform 250ms ease-in-out",
            }}
          >
            {renderContent()}
          </div>
        </div>

        {activeCard && renderModal()}
      </div>
    </CanvasLayout>
  );
}

function StepContent({ children }: { children: React.ReactNode }) {
  return <div className="px-5 py-4">{children}</div>;
}
