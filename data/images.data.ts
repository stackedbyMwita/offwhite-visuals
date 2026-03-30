export const WESO_GALLERY = [
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901475/WhatsApp_Image_2026-01-15_at_6.55.17_PM_h98exp.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901473/WESO_isaac_1_qdhtic.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901472/WESO_first_anniversary_white_ftozhs.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901472/WESO_jenner_o7tbh1.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901472/WESO_jamine_xasfmu.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901470/WESO_daniel_c335tp.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901468/WESO_first_anniversary_kqljxv.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901467/weso-yvonne_racrxz.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901467/weso-happy-new-year_efhldz.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901465/weso_bungoma_final_ixfvkl.png',
]

export const ARCEN_GALLERY = [
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901615/arcen7_yddnz2.png',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901547/arcen5_pryxfy.png',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901524/arcen6_jwf5e3.png',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901520/arcen2_flsfsv.png',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901516/arcen3_skemtt.png',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901505/arcen4_wguhby.png',
]

export const MOCKUP_GALLERY = [
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774902118/hoodie-yellow_xrxics.png',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901945/Black-Hoody-Mockup_pky7et.png',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901730/Perspective-Folded-Hoodie-Mockup_ltuwgb.png',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774904404/samples/ecommerce/shoes.png',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774904404/samples/chair.png',
]

export const CAMPAIGN_GALLERY = [
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774902120/valentine_2x_cl9ho0.png',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774902044/savannah-digital-media-campaign-1_qdvmau.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901481/x-mas_aaxlal.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901479/x-mas_2_vt7wll.jpg',
  'https://res.cloudinary.com/drqx6iayx/image/upload/v1774901704/event-one_kecwtl.png',
]

// Combined per service
export const SERVICE_GALLERIES: Record<string, string[]> = {
  'graphic-design': [
    ...CAMPAIGN_GALLERY,
    ...WESO_GALLERY,
    ...MOCKUP_GALLERY,
  ],
  'brand-identity': [
    ...ARCEN_GALLERY,
    ...MOCKUP_GALLERY,
    ...CAMPAIGN_GALLERY.slice(0, 3),
  ],
  'ui-ux-design': [
    ...ARCEN_GALLERY.slice(0, 4),
    ...CAMPAIGN_GALLERY.slice(0, 3),
    ...WESO_GALLERY.slice(0, 4),
  ],
  'web-development': [
    ...ARCEN_GALLERY,
    ...CAMPAIGN_GALLERY,
  ],
  'seo-growth': [
    ...CAMPAIGN_GALLERY,
    ...WESO_GALLERY.slice(0, 5),
  ],
}