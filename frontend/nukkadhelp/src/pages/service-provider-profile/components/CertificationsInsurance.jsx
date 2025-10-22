import React from 'react';
import Icon from '../../../components/AppIcon';

const CertificationsInsurance = ({ certifications, insurance }) => {
  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Certifications & Insurance</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Certifications */}
        <div>
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Award" size={18} className="text-primary" />
            Certifications
          </h3>
          
          <div className="space-y-3">
            {certifications?.map((cert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="CheckCircle" size={16} className="text-success mt-1" />
                <div>
                  <p className="font-medium text-foreground text-sm">{cert?.name}</p>
                  <p className="text-xs text-muted-foreground">{cert?.issuer}</p>
                  <p className="text-xs text-muted-foreground">
                    Issued: {new Date(cert.issueDate)?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance */}
        <div>
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Shield" size={18} className="text-primary" />
            Insurance Coverage
          </h3>
          
          <div className="space-y-3">
            {insurance?.map((policy, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="CheckCircle" size={16} className="text-success mt-1" />
                <div>
                  <p className="font-medium text-foreground text-sm">{policy?.type}</p>
                  <p className="text-xs text-muted-foreground">Coverage: {policy?.coverage}</p>
                  <p className="text-xs text-muted-foreground">
                    Valid until: {new Date(policy.expiryDate)?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsInsurance;