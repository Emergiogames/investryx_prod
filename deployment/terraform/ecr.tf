provider "aws" {
  region = "ap-south-1"
}

resource "aws_ecr_repository" "backend" {
  name = "investryx-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "nginx" {
  name = "investryx-nginx"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "redis" {
  name = "investryx-redis"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# Lifecycle policy to keep only last 5 images
resource "aws_ecr_lifecycle_policy" "cleanup_policy" {
  for_each = toset(["backend", "nginx", "redis"])
  
  repository = aws_ecr_repository[each.key].name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 5 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 5
      }
      action = {
        type = "expire"
      }
    }]
  })
}
