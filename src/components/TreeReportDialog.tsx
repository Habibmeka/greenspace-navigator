
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface TreeReportForm {
  adresse: string;
  arrondissement: string;
  espece: string;
  motif: string;
  description: string;
  contact: string;
}

interface TreeReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TreeReportDialog: React.FC<TreeReportDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TreeReportForm>();

  const arrondissements = [
    'PARIS 1ER ARRDT', 'PARIS 2E ARRDT', 'PARIS 3E ARRDT', 'PARIS 4E ARRDT',
    'PARIS 5E ARRDT', 'PARIS 6E ARRDT', 'PARIS 7E ARRDT', 'PARIS 8E ARRDT',
    'PARIS 9E ARRDT', 'PARIS 10E ARRDT', 'PARIS 11E ARRDT', 'PARIS 12E ARRDT',
    'PARIS 13E ARRDT', 'PARIS 14E ARRDT', 'PARIS 15E ARRDT', 'PARIS 16E ARRDT',
    'PARIS 17E ARRDT', 'PARIS 18E ARRDT', 'PARIS 19E ARRDT', 'PARIS 20E ARRDT'
  ];

  const motifs = [
    'Arbre malade ou dépérissant',
    'Risque de chute',
    'Racines endommagées',
    'Branches dangereuses',
    'Parasites ou champignons',
    'Autre'
  ];

  const onSubmit = (data: TreeReportForm) => {
    console.log('Signalement d\'arbre:', data);
    toast({
      title: "Signalement envoyé",
      description: "Votre signalement a été transmis aux services compétents. Merci pour votre contribution.",
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Signaler un arbre</DialogTitle>
          <DialogDescription>
            Signalez un arbre nécessitant une attention particulière ou présentant des risques.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adresse">Adresse complète</Label>
            <Input
              id="adresse"
              placeholder="Ex: 123 Rue de la Paix"
              {...register('adresse', { required: 'L\'adresse est obligatoire' })}
            />
            {errors.adresse && <p className="text-sm text-red-500">{errors.adresse.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="arrondissement">Arrondissement</Label>
            <Select onValueChange={(value) => setValue('arrondissement', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un arrondissement" />
              </SelectTrigger>
              <SelectContent>
                {arrondissements.map((arr) => (
                  <SelectItem key={arr} value={arr}>{arr}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="espece">Espèce d'arbre (si connue)</Label>
            <Input
              id="espece"
              placeholder="Ex: Platane, Tilleul, Marronnier..."
              {...register('espece')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motif">Motif du signalement</Label>
            <Select onValueChange={(value) => setValue('motif', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un motif" />
              </SelectTrigger>
              <SelectContent>
                {motifs.map((motif) => (
                  <SelectItem key={motif} value={motif}>{motif}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description détaillée</Label>
            <Textarea
              id="description"
              placeholder="Décrivez précisément le problème observé..."
              rows={3}
              {...register('description', { required: 'Une description est obligatoire' })}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact (email ou téléphone)</Label>
            <Input
              id="contact"
              placeholder="votre.email@exemple.fr ou 01 23 45 67 89"
              {...register('contact', { required: 'Un moyen de contact est obligatoire' })}
            />
            {errors.contact && <p className="text-sm text-red-500">{errors.contact.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Envoyer le signalement
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TreeReportDialog;
