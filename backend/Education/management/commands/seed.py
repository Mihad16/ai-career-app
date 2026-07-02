import csv
from pathlib import Path

from django.core.management.base import BaseCommand
from Education.models import EducationLevel, Stream, Degree, Subject


class Command(BaseCommand):
    help = "Seed Education data"

    def handle(self, *args, **options):
        # Import Education Levels
        education_file = Path("seed/education_levels.csv")

        with open(education_file, newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            for row in reader:
                if not any(row.values()):
                    continue

                EducationLevel.objects.get_or_create(
                    name=row["name"],
                    defaults={
                        "description": row.get("description", "")
                    }
                )

        self.stdout.write(self.style.SUCCESS("✓ Education Levels Imported"))

        # Import Streams
        streams_file = Path("seed/streams.csv")

        with open(streams_file, newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            for row in reader:
                if not any(row.values()):
                    continue

                education_level = EducationLevel.objects.get(
                    name=row["education_level"]
                )

                Stream.objects.get_or_create(
                    education_level=education_level,
                    name=row["name"],
                    defaults={
                        "description": row.get("description", "")
                    }
                )

        self.stdout.write(self.style.SUCCESS("✓ Streams Imported"))

        # Import Subjects
        subjects_file = Path("seed/subjects.csv")

        with open(subjects_file, newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            for row in reader:
                if not any(row.values()):
                    continue

                education_level = EducationLevel.objects.get(
                    name=row["education_level"]
                )

                stream = Stream.objects.get(
                    education_level=education_level,
                    name=row["stream"]
                )

                Subject.objects.get_or_create(
                    stream=stream,
                    name=row["name"],
                    defaults={
                        "description": row.get("description", "")
                    }
                )

        self.stdout.write(self.style.SUCCESS("✓ Subjects Imported"))

        # Import Degrees
        degrees_file = Path("seed/degrees.csv")

        with open(degrees_file, newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            for row in reader:
                if not any(row.values()):
                    continue

                subject_label = row["Subject"]

                try:
                    subject = Subject.objects.get(name=subject_label)
                    stream = subject.stream
                except Subject.DoesNotExist:
                    # Some degree rows reference stream names directly.
                    stream = Stream.objects.filter(
                        name=subject_label,
                        education_level__name="After Plus Two (+2)"
                    ).first()
                    if stream is None:
                        stream = Stream.objects.filter(name=subject_label).first()

                if stream is None:
                    raise ValueError(
                        f"Could not resolve degree subject/stream '{subject_label}'"
                    )

                Degree.objects.get_or_create(
                    subject=stream,
                    name=row["name"],
                    defaults={
                        "duration": row.get("duration", ""),
                        "description": row.get("description", ""),
                    }
                )

        self.stdout.write(self.style.SUCCESS("✓ Degrees Imported"))
        self.stdout.write(self.style.SUCCESS("🎉 Database Seed Completed"))
