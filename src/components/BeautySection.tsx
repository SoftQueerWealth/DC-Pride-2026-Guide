import type { BeautyField, BeautyItem } from '../types/beauty';
import { trackBeautyClick } from '../lib/analytics';

function beautyDetailValue(field: BeautyField) {
  if (!field.href) return field.value;

  return (
    <a href={field.href} target="_blank" rel="noopener noreferrer">
      {field.value}
    </a>
  );
}

function isTitleField(field: BeautyField): boolean {
  return ['businessname', 'business', 'brand', 'brandname', 'partner', 'partnername', 'name'].includes(field.key);
}

function isBusinessTypeField(field: BeautyField): boolean {
  return ['businesstype', 'businesscategory', 'category', 'type'].includes(field.key);
}

function isBookingField(field: BeautyField): boolean {
  return ['bookingsite', 'booking', 'book', 'bookinglink', 'bookingurl'].includes(field.key);
}

function isTravelsField(field: BeautyField): boolean {
  return ['travels', 'travelsstatus', 'travel', 'travelstatus'].includes(field.key);
}

function isOwnerField(field: BeautyField): boolean {
  return ['owner', 'businessowner', 'contactowner'].includes(field.key);
}

function isYes(value: string): boolean {
  return ['yes', 'y', 'true'].includes(value.toLowerCase().trim());
}

interface BeautySectionProps {
  items: BeautyItem[];
}

export function BeautySection({ items }: BeautySectionProps) {
  return (
    <section className="beauty-section">
      <div className="beauty-header">
        <div>
          <h2>Community Perks</h2>
          <p>Perks, services, and self-care picks vetted for the community</p>
        </div>
        <span className="beauty-count">
          {items.length} partner{items.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="beauty-list">
        {items.map((item) => {
          const travels = item.fields.some((field) => isTravelsField(field) && isYes(field.value));
          const detailFields = item.fields.filter(
            (field) =>
              !isTitleField(field) &&
              !isBusinessTypeField(field) &&
              !isBookingField(field) &&
              !isTravelsField(field) &&
              !isOwnerField(field),
          );

          return (
            <article key={item.id} className="beauty-partner-card">
              <div className="beauty-partner-top">
                <div>
                  <div className="event-badges">
                    <span className="badge b-happyhour">{item.businessType}</span>
                    {travels ? <span className="badge b-wellness">Mobile</span> : null}
                  </div>
                  <h3>{item.name}</h3>
                </div>
                {item.primaryHref ? (
                  <a
                    href={item.primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-p"
                    onClick={() => trackBeautyClick(item.name, item.primaryHref!)}
                  >
                    Book Here
                  </a>
                ) : null}
              </div>

              <dl className="beauty-details">
                {detailFields.map((field) => (
                  <div key={field.key} className="beauty-detail">
                    <dt>{field.label}</dt>
                    <dd>{beautyDetailValue(field)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}
